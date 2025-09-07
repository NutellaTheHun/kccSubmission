import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StormHeaderData } from './storm-header-data';
import { WindRadiiMaxExtentData } from './wind-radii-max-extent-data';

@Entity('storm_data')
export class StormData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  month: number;

  @Column()
  day: number;

  @Column()
  hoursUTC: number;

  @Column()
  minutes: number;

  @Column()
  latitude: number;

  @Column()
  hemisphereNS: string;

  @Column()
  longitude: number;

  @Column()
  hemisphereEW: string;

  @Column()
  maxSustainedWindKnots: number;

  @Column()
  minPressureMillibars: number;

  @Column({ nullable: true })
  radiusMaxWindNauticalMiles: number | null;

  @ManyToOne(() => StormHeaderData, { nullable: false })
  @JoinColumn({ name: 'header_id' })
  headerData: StormHeaderData;

  @OneToOne(() => WindRadiiMaxExtentData, { nullable: true })
  @JoinColumn()
  windRadiiMaxData: WindRadiiMaxExtentData | null;
}
