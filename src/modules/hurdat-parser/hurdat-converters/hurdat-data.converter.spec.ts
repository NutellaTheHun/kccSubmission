import { parseHurdatDataRow } from '../parsers/parse-hurdat-data-row';
import { hurdatDataToStormDataDto } from './hurdat-data.converter';

describe('hurdat data to stormData Dto', () => {
  it('should convert hurdatRow with no recordID to createStormDto', () => {
    const noRecordId = [
      '20210829',
      '0000',
      '',
      'HU',
      '26.7N',
      '87.6W',
      '90',
      '967',
      '120',
      '100',
      '80',
      '110',
      '70',
      '60',
      '40',
      '60',
      '35',
      '30',
      '20',
      '30',
      '20',
    ];
    const headerId = 1;
    const wrmId = 2;

    const hurdatRow = parseHurdatDataRow(noRecordId);

    const result = hurdatDataToStormDataDto(hurdatRow, headerId, wrmId);

    expect(result.year).toEqual(2021);
    expect(result.month).toEqual(8);
    expect(result.day).toEqual(29);
    expect(result.hoursUTC).toEqual(0);
    expect(result.minutes).toEqual(0);
    expect(result.latitude).toEqual(26.7);
    expect(result.hemisphereNS).toEqual('N');
    expect(result.longitude).toEqual(87.6);
    expect(result.hemisphereEW).toEqual('W');
    expect(result.maxSustainedWindKnots).toEqual(90);
    expect(result.minPressureMillibars).toEqual(967);
    expect(result.radiusMaxWindNauticalMiles).toEqual(20);
    expect(result.headerId).toEqual(1);
    expect(result.windRadiiMaxDataId).toEqual(2);
    expect(result.recordIdentifier).toBeUndefined();
    expect(result.systemStatus).toEqual('HU');
  });

  it('should convert hurdatRow with recordID to createStormDto', () => {
    const recordId = [
      '20210829',
      '0000',
      'L',
      'HU',
      '26.7N',
      '87.6W',
      '90',
      '967',
      '120',
      '100',
      '80',
      '110',
      '70',
      '60',
      '40',
      '60',
      '35',
      '30',
      '20',
      '30',
      '20',
    ];
    const headerId = 1;
    const wrmId = 2;

    const hurdatRow = parseHurdatDataRow(recordId);

    const result = hurdatDataToStormDataDto(hurdatRow, headerId, wrmId);

    expect(result.year).toEqual(2021);
    expect(result.month).toEqual(8);
    expect(result.day).toEqual(29);
    expect(result.hoursUTC).toEqual(0);
    expect(result.minutes).toEqual(0);
    expect(result.latitude).toEqual(26.7);
    expect(result.hemisphereNS).toEqual('N');
    expect(result.longitude).toEqual(87.6);
    expect(result.hemisphereEW).toEqual('W');
    expect(result.maxSustainedWindKnots).toEqual(90);
    expect(result.minPressureMillibars).toEqual(967);
    expect(result.radiusMaxWindNauticalMiles).toEqual(20);
    expect(result.headerId).toEqual(1);
    expect(result.windRadiiMaxDataId).toEqual(2);
    expect(result.recordIdentifier).toEqual('L');
    expect(result.systemStatus).toEqual('HU');
  });

  it('should convert hurdatRow with optional (-999) properties undefined to createStormDto', () => {
    const row999 = [
      '20210829',
      '0000',
      '',
      'HU',
      '26.7N',
      '87.6W',
      '90',
      '-999',
      '-999',
      '-999',
      '-999',
      '-999',
      '-999',
      '-999',
      '-999',
      '-999',
      '-999',
      '-999',
      '-999',
      '-999',
      '-999',
    ];
    const headerId = 1;

    const hurdatRow = parseHurdatDataRow(row999);

    const result = hurdatDataToStormDataDto(hurdatRow, headerId, undefined);

    expect(result.year).toEqual(2021);
    expect(result.month).toEqual(8);
    expect(result.day).toEqual(29);
    expect(result.hoursUTC).toEqual(0);
    expect(result.minutes).toEqual(0);
    expect(result.latitude).toEqual(26.7);
    expect(result.hemisphereNS).toEqual('N');
    expect(result.longitude).toEqual(87.6);
    expect(result.hemisphereEW).toEqual('W');
    expect(result.maxSustainedWindKnots).toEqual(90);
    expect(result.minPressureMillibars).toBeUndefined();
    expect(result.radiusMaxWindNauticalMiles).toBeUndefined();
    expect(result.headerId).toEqual(1);
    expect(result.windRadiiMaxDataId).toBeUndefined();
    expect(result.recordIdentifier).toBeUndefined();
    expect(result.systemStatus).toEqual('HU');
  });
});
