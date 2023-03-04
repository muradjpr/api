import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('students')
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roll: number;

  @Column()
  name: string;

  @Column()
  mobile: string;

  @Column()
  email: string;

  @Column()
  course: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMPS' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMPS' })
  updatedAt: Date;
}
