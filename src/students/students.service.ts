import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentsService {
  constructor() {}

  getAllStudents() {
    return 'all students';
  }
}
