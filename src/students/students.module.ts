import { Module } from '@nestjs/common';
import { StudentController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './entity/student.entity';

@Module({
  controllers: [StudentController],
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  providers: [StudentsService],
})
export class StudentsModule {}
