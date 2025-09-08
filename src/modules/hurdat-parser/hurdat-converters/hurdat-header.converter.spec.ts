import { parseHurdatHeaderRow } from '../parsers/parse-hurdat-header-row';
import { hurdatHeaderToStormHeaderDto } from './hurdat-header.converter';

describe('hurdat headers to storm header Dto', () => {
  it('should convert hurdat header to createStormHeaderDto', () => {
    const withName = ['AL092021', 'IDA', '40'];

    const hurdatHeader = parseHurdatHeaderRow(withName);

    const result = hurdatHeaderToStormHeaderDto(hurdatHeader);

    expect(result.location).toEqual('AL');
    expect(result.ATCFCycloneNumber).toEqual(9);
    expect(result.year).toEqual(2021);
    expect(result.name).toEqual('IDA');
    expect(result.entries).toEqual(40);
  });
});
