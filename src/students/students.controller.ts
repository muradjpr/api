import { Controller, Get } from '@nestjs/common';
import { StudentsService } from './students.service';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';

@Controller('students')
export class StudentController {
  constructor(private stdService: StudentsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAll() {
    return this.stdService.getAllStudents();
  }
}
