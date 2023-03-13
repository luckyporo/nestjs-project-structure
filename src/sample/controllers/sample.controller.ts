import { Controller, Get } from '@nestjs/common';

import type { SampleService } from '../providers';

@Controller('debug')
export class SampleController {
  constructor(private sample: SampleService) {}

  @Get() // http://localhost:3000/test/debug
  public step(): string {
    return 'OK';
  }
}
