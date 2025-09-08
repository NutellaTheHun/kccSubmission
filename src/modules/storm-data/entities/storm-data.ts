import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StormHeader } from './storm-header';
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

  @Column('integer', { nullable: true })
  radiusMaxWindNauticalMiles: number | null;

  @ManyToOne(() => StormHeader, { nullable: false })
  @JoinColumn({ name: 'header_id' })
  headerData: StormHeader;

  @OneToOne(() => WindRadiiMaxExtentData, { nullable: true })
  @JoinColumn()
  windRadiiMaxData: WindRadiiMaxExtentData | null;

  @Column('varchar', { nullable: true })
  recordIdentifier: string | null;

  @Column()
  systemStatus: string;
}
