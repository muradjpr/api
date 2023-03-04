import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './entity/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly repository: Repository<StudentEntity>,
  ) {}

  getAll() {
    return 'all students';
  }
}
