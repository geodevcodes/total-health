import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

// No @ApiTags — this controller is intentionally outside Swagger scope
@ApiTags("Hey! Wasup, Let's roll...")
@Controller() // No prefix → owns '/' before global prefix applies
export class RootController {
  constructor(private readonly appService: AppService) {}

  // GET / HTML landing page
  @Get()
  getWelcomeMessage() {
    return this.appService.getWelcomeMessage();
  }
}
