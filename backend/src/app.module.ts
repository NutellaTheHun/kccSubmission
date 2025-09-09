import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeometryModule } from './modules/geometry/geometry.module';
import { HurdatParserModule } from './modules/hurdat-parser/hurdat-parser.module';
import { ReportModule } from './modules/report/report.module';
import { StormDataModule } from './modules/storm-data/storm-data.module';
import { getTypeOrmModule } from './typeorm/getTypeOrmModule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    getTypeOrmModule([]),

    StormDataModule,
    HurdatParserModule,
    GeometryModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
