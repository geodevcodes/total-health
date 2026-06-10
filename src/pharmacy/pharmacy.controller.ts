import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';
import { CreatePharmacyProfileDto } from './dto/create-pharmacy-profile.dto';
import { CreatePharmacyBranchesDto } from './dto/create-pharmacy-branch.dto';
import { CreateDrugAvailabilityDto } from './dto/create-drug-availability.dto';
import { PassportJwtAuthGuard } from '../auth/guards/passport-jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserAccountType } from '../users/entities/user.entity';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PharmacyProfileEntity } from './entities/pharmacy.entity';

@ApiTags('Pharmacy')
@ApiBearerAuth()
@UseGuards(PassportJwtAuthGuard, RolesGuard)
@Roles(UserAccountType.PHARMACY)
@Controller('pharmacy')
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}

  @Post('profile')
  @ApiOperation({
    summary: 'Save pharmacy primary information and working schedule',
  })
  @ApiOkResponse({ type: PharmacyProfileEntity })
  @HttpCode(HttpStatus.OK)
  async saveProfile(
    @Req() req: any,
    @Body() dto: CreatePharmacyProfileDto,
  ) {
    return this.pharmacyService.saveProfile(req.user.userId, dto);
  }

  @Post('branches')
  @ApiOperation({ summary: 'Save pharmacy branch locations' })
  @ApiOkResponse({ type: PharmacyProfileEntity })
  @HttpCode(HttpStatus.OK)
  async saveBranches(
    @Req() req: any,
    @Body() dto: CreatePharmacyBranchesDto,
  ) {
    return this.pharmacyService.saveBranches(req.user.userId, dto);
  }

  @Post('drug-availability')
  @ApiOperation({ summary: 'Save pharmacy special drug availability' })
  @ApiOkResponse({ type: PharmacyProfileEntity })
  @HttpCode(HttpStatus.OK)
  async saveDrugAvailability(
    @Req() req: any,
    @Body() dto: CreateDrugAvailabilityDto,
  ) {
    return this.pharmacyService.saveDrugAvailability(req.user.userId, dto);
  }

  @Get('profile/me')
  @ApiOperation({ summary: 'Get current pharmacy profile' })
  @ApiOkResponse({ type: PharmacyProfileEntity })
  async getMyProfile(@Req() req: any) {
    return this.pharmacyService.getMyProfile(req.user.userId);
  }
}
