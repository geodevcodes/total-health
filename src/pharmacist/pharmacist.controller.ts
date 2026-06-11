import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PharmacistService } from './pharmacist.service';
import { CreatePharmacistDto } from './dto/create-pharmacist.dto';
import { InvitePharmacistDto } from './dto/invite-pharmacist.dto';
import { UpdatePharmacistStatusDto } from './dto/update-pharmacist-status.dto';
import { PassportJwtAuthGuard } from '../auth/guards/passport-jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserAccountType } from '../users/entities/user.entity';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  PharmacistEntity,
  PharmacistInviteEntity,
} from './entities/pharmacist.entity';
import { UpdatePharmacistDto } from './dto/update-pharmacist.dto';

@ApiTags('Pharmacists')
@ApiBearerAuth()
@UseGuards(PassportJwtAuthGuard, RolesGuard)
@Roles(UserAccountType.PHARMACY)
@Controller('pharmacist')
export class PharmacistController {
  constructor(private readonly pharmacistService: PharmacistService) {}

  @Get()
  @ApiOperation({ summary: 'Get all pharmacists for this pharmacy' })
  @ApiOkResponse({ type: PharmacistEntity, isArray: true })
  async getAllPharmacists(@Req() req: any) {
    const pharmacyId = await this.pharmacistService.getPharmacyIdFromUser(
      req.user.userId,
    );
    return this.pharmacistService.getAllPharmacists(pharmacyId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get pharmacist by ID' })
  @ApiParam({ name: 'id', description: 'Pharmacist MongoDB ObjectId' })
  @ApiOkResponse({ type: PharmacistEntity })
  async getPharmacistById(@Req() req: any, @Param('id') id: string) {
    const pharmacyId = await this.pharmacistService.getPharmacyIdFromUser(
      req.user.userId,
    );
    return this.pharmacistService.getPharmacistById(pharmacyId, id);
  }

  @Post()
  @ApiOperation({ summary: 'Add a pharmacist manually' })
  @ApiOkResponse({ type: PharmacistEntity })
  @HttpCode(HttpStatus.OK)
  async addPharmacist(@Req() req: any, @Body() dto: CreatePharmacistDto) {
    const pharmacyId = await this.pharmacistService.getPharmacyIdFromUser(
      req.user.userId,
    );
    return this.pharmacistService.addPharmacist(pharmacyId, dto);
  }

  @Post('invite')
  @ApiOperation({ summary: 'Invite pharmacists via email' })
  @ApiOkResponse({ type: PharmacistInviteEntity, isArray: true })
  @HttpCode(HttpStatus.OK)
  async invitePharmacists(
    @Req() req: any,
    @Body() dto: InvitePharmacistDto,
  ) {
    const pharmacyId = await this.pharmacistService.getPharmacyIdFromUser(
      req.user.userId,
    );
    return this.pharmacistService.invitePharmacists(pharmacyId, dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update pharmacist details' })
  @ApiParam({ name: 'id', description: 'Pharmacist MongoDB ObjectId' })
  @ApiOkResponse({ type: PharmacistEntity })
  async updatePharmacist(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdatePharmacistDto,
  ) {
    const pharmacyId = await this.pharmacistService.getPharmacyIdFromUser(
      req.user.userId,
    );

    return this.pharmacistService.updatePharmacist(pharmacyId, id, dto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Disable or re-enable a pharmacist' })
  @ApiParam({ name: 'id', description: 'Pharmacist MongoDB ObjectId' })
  @ApiOkResponse({ type: PharmacistEntity })
  async updatePharmacistStatus(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdatePharmacistStatusDto,
  ) {
    const pharmacyId = await this.pharmacistService.getPharmacyIdFromUser(
      req.user.userId,
    );
    return this.pharmacistService.updatePharmacistStatus(pharmacyId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a pharmacist permanently' })
  @ApiParam({ name: 'id', description: 'Pharmacist MongoDB ObjectId' })
  @ApiOkResponse({ description: 'Pharmacist removed successfully' })
  @HttpCode(HttpStatus.OK)
  async removePharmacist(@Req() req: any, @Param('id') id: string) {
    const pharmacyId = await this.pharmacistService.getPharmacyIdFromUser(
      req.user.userId,
    );
    return this.pharmacistService.removePharmacist(pharmacyId, id);
  }
}
