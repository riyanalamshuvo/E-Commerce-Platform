import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHome() {
    return {
      message: '🚀 Welcome to the E-Commerce API (Admin Section Ready)',
      availableRoutes: {
        admin: '/admin',
      },
    };
  }
}
