import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePharmacyProfileDto } from './dto/create-pharmacy-profile.dto';
import { CreatePharmacyBranchesDto } from './dto/create-pharmacy-branch.dto';
import { CreateDrugAvailabilityDto } from './dto/create-drug-availability.dto';

@Injectable()
export class PharmacyService {
  constructor(private prisma: PrismaService) {}

  // TAB 1 — Primary information + working schedule
  async saveProfile(userId: string, dto: CreatePharmacyProfileDto) {
    const existing = await this.prisma.pharmacyProfile.findUnique({
      where: { userId },
    });

    const { workingSchedules, ...profileData } = dto;

    if (existing) {
      // Update existing profile
      await this.prisma.workingSchedule.deleteMany({
        where: { pharmacyId: existing.id },
      });

      return this.prisma.pharmacyProfile.update({
        where: { userId },
        data: {
          ...profileData,
          workingSchedules: workingSchedules?.length
            ? { create: workingSchedules }
            : undefined,
        },
        include: { workingSchedules: true },
      });
    }

    // Create new profile
    return this.prisma.pharmacyProfile.create({
      data: {
        userId,
        ...profileData,
        workingSchedules: workingSchedules?.length
          ? { create: workingSchedules }
          : undefined,
      },
      include: { workingSchedules: true },
    });
  }

  // TAB 2 — Locations / branches
  async saveBranches(userId: string, dto: CreatePharmacyBranchesDto) {
    const profile = await this.getProfileOrThrow(userId);

    // Replace all branches on each save
    await this.prisma.pharmacyBranch.deleteMany({
      where: { pharmacyId: profile.id },
    });

    await this.prisma.pharmacyBranch.createMany({
      data: dto.branches.map((b) => ({
        pharmacyId: profile.id,
        ...b,
      })),
    });

    return this.prisma.pharmacyProfile.findUnique({
      where: { id: profile.id },
      include: { branches: true },
    });
  }

  // TAB 3 — Drug availability
  async saveDrugAvailability(userId: string, dto: CreateDrugAvailabilityDto) {
    const profile = await this.getProfileOrThrow(userId);

    // Replace all drug categories on each save
    await this.prisma.pharmacyDrugCategory.deleteMany({
      where: { pharmacyId: profile.id },
    });

    await this.prisma.pharmacyDrugCategory.createMany({
      data: dto.categories.map((c) => ({
        pharmacyId: profile.id,
        name: c.name,
        drugs: c.drugs,
      })),
    });

    // Mark setup as complete on final step
    await this.prisma.pharmacyProfile.update({
      where: { id: profile.id },
      data: { isSetupComplete: true },
    });

    return this.prisma.pharmacyProfile.findUnique({
      where: { id: profile.id },
      include: { drugCategories: true },
    });
  }

  // GET full pharmacy profile
  async getMyProfile(userId: string) {
    const profile = await this.prisma.pharmacyProfile.findUnique({
      where: { userId },
      include: {
        workingSchedules: true,
        branches: true,
        drugCategories: true,
      },
    });

    if (!profile) throw new NotFoundException('Pharmacy profile not found');
    return profile;
  }

  // Helper
  private async getProfileOrThrow(userId: string) {
    const profile = await this.prisma.pharmacyProfile.findUnique({
      where: { userId },
    });
    if (!profile) {
      throw new NotFoundException(
        'Pharmacy profile not found. Complete primary information first.',
      );
    }
    return profile;
  }
}
