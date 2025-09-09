import type { Geometry } from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('states')
export class State {
  @PrimaryGeneratedColumn({ name: 'gid' })
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'MultiPolygon',
    srid: 4326,
    nullable: false,
  })
  geometry: Geometry;
}
