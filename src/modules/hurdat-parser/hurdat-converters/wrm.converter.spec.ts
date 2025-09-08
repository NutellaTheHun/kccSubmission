import { parseHurdatDataRow } from '../parsers/parse-hurdat-data-row';
import { hurdatDataToWRMDto } from './hurdat-wrm.converter';

const csvParse = [
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

describe('hurdat wind radii maximum extent to WRM Dto', () => {
  it('should convert hurdat row to WRM dto', () => {
    const hurdatRow = parseHurdatDataRow(csvParse);
    const result = hurdatDataToWRMDto(hurdatRow);
    expect(result.ne34).toEqual(120);
    expect(result.se34).toEqual(100);
    expect(result.sw34).toEqual(80);
    expect(result.nw34).toEqual(110);
    expect(result.ne50).toEqual(70);
    expect(result.se50).toEqual(60);
    expect(result.sw50).toEqual(40);
    expect(result.nw50).toEqual(60);
    expect(result.ne64).toEqual(35);
    expect(result.se64).toEqual(30);
    expect(result.sw64).toEqual(20);
    expect(result.nw64).toEqual(30);
  });
});
