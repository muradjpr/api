import { Module } from '@nestjs/common';
import { ResultsController } from './results.controller';
import { ResultsService } from './results.service';

@Module({
  controllers: [ResultsController],
  imports: [],
  providers: [ResultsService],
})
export class StudentsModule {}
