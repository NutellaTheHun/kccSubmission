import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('record_identifier')
export class RecordIdentifier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  identifier: string;

  @Column({ nullable: true })
  description: string | null;
}
