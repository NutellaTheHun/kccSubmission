import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('storm_header')
export class StormHeader {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location: string;

  @Column()
  ATCFCycloneNumber: number;

  @Column()
  year: number;

  @Column({ default: 'UNNAMED', nullable: false })
  name: string;

  @Column()
  entries: number;
}
