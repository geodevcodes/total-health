import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { CreatePharmacistDto } from './dto/create-pharmacist.dto';
import { InvitePharmacistDto } from './dto/invite-pharmacist.dto';
import { UpdatePharmacistStatusDto } from './dto/update-pharmacist-status.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class PharmacistService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  // GET ALL PHARMACISTS for this pharmacy
  async getAllPharmacists(pharmacyId: string) {
    return this.prisma.pharmacist.findMany({
      where: { pharmacyId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // GET ONE PHARMACIST
  async getPharmacistById(pharmacyId: string, pharmacistId: string) {
    const pharmacist = await this.prisma.pharmacist.findFirst({
      where: { id: pharmacistId, pharmacyId },
    });
    if (!pharmacist) throw new NotFoundException('Pharmacist not found');
    return pharmacist;
  }

  // ADD PHARMACIST MANUALLY
  async addPharmacist(pharmacyId: string, dto: CreatePharmacistDto) {
    const existing = await this.prisma.pharmacist.findFirst({
      where: { pharmacyId, workEmail: dto.workEmail },
    });
    if (existing)
      throw new ConflictException('Pharmacist with this email already exists');

    return this.prisma.pharmacist.create({
      data: {
        pharmacyId,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.workEmail,
        workEmail: dto.workEmail,
        phoneNumber: dto.phoneNumber,
        licenseNumber: dto.licenseNumber,
        employeeNumber: dto.employeeNumber,
        languagesSpoken: dto.languagesSpoken ?? [],
        bio: dto.bio,
        avatar: dto.avatar,
      },
    });
  }

  // INVITE PHARMACISTS VIA EMAIL
  async invitePharmacists(pharmacyId: string, dto: InvitePharmacistDto) {
    // Fetch pharmacy name for the email
    const pharmacy = await this.prisma.pharmacyProfile.findUnique({
      where: { id: pharmacyId },
      select: { address: true, user: { select: { practiceName: true } } },
    });

    const pharmacyName = pharmacy?.user?.practiceName ?? 'Your Pharmacy';

    const results = await Promise.all(
      dto.invites.map(async (invite) => {
        await this.prisma.pharmacistInvite.deleteMany({
          where: { pharmacyId, email: invite.email },
        });

        const token = randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

        const record = await this.prisma.pharmacistInvite.create({
          data: {
            pharmacyId,
            email: invite.email,
            employeeNumber: invite.employeeNumber,
            token,
            expiresAt,
          },
        });

        // Build the invite link — frontend will handle the accept flow
        const inviteLink = `${process.env.FRONTEND_URL}/accept-invite?token=${token}`;
        // const inviteLink = `https://total-healthcaree.vercel.app/accept-invite?token=${token}`;

        // ✅ Now actually sending the email
        await this.mailService.sendPharmacistInvite(
          invite.email,
          pharmacyName,
          inviteLink,
          invite.employeeNumber,
        );

        return record;
      }),
    );

    return {
      message: `${results.length} invite(s) sent successfully`,
      invites: results,
    };
  }

  // UPDATE PHARMACIST (details)
  async updatePharmacist(
    pharmacyId: string,
    pharmacistId: string,
    dto: Partial<CreatePharmacistDto>,
  ) {
    await this.getPharmacistById(pharmacyId, pharmacistId); // throws if not found

    return this.prisma.pharmacist.update({
      where: { id: pharmacistId },
      data: dto,
    });
  }

  // DISABLE or REMOVE PHARMACIST
  async updatePharmacistStatus(
    pharmacyId: string,
    pharmacistId: string,
    dto: UpdatePharmacistStatusDto,
  ) {
    await this.getPharmacistById(pharmacyId, pharmacistId);

    return this.prisma.pharmacist.update({
      where: { id: pharmacistId },
      data: {
        status: dto.status,
        isActive: dto.status === 'ACTIVE',
      },
    });
  }

  // DELETE PHARMACIST permanently
  async removePharmacist(pharmacyId: string, pharmacistId: string) {
    await this.getPharmacistById(pharmacyId, pharmacistId);
    await this.prisma.pharmacist.delete({ where: { id: pharmacistId } });
    return { message: 'Pharmacist removed successfully' };
  }

  // Helper — get PharmacyProfile from userId
  async getPharmacyIdFromUser(userId: string): Promise<string> {
    const profile = await this.prisma.pharmacyProfile.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!profile) throw new NotFoundException('Pharmacy profile not found');
    return profile.id;
  }
}
