import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('system_status')
export class SystemStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  identifier: string;

  @Column({ nullable: true })
  description: string | null;
}
