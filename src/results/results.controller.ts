import { Controller, Get } from '@nestjs/common';
import { ResultsService } from './results.service';

@Controller('students')
export class ResultsController {
  constructor(private resultService: ResultsService) {}

  @Get()
  getAll() {
    return this.resultService.getAllStudents();
  }
}
