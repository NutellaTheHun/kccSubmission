import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wind_radii_max_extent')
export class WindRadiiMaxExtentData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ne34: number;

  @Column()
  se34: number;

  @Column()
  sw34: number;

  @Column()
  nw34: number;

  @Column()
  ne50: number;

  @Column()
  se50: number;

  @Column()
  sw50: number;

  @Column()
  nw50: number;

  @Column()
  ne64: number;

  @Column()
  se64: number;

  @Column()
  sw64: number;

  @Column()
  nw64: number;
}
