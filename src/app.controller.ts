import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Hey! Wasup, Let's roll...")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('info')
  getApiInfo() {
    return this.appService.getApiInfo();
  }

  @Get('health')
  health() {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
