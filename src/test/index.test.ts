const FormatPrice = require('../index').default;

describe('1. Use default options', function() {

  const f = new FormatPrice();

  it('should return 0.00 when the value starts with invalid character', function() {
    expect(f.formatPrice('abc123,.')).toEqual('0.00')
  })

  it('should return 0.00 when the value is 0', function() {
    expect(f.formatPrice('0')).toEqual('0.00')
  })

  it('should return 0.00 when the value is null', function() {
    expect(f.formatPrice('')).toEqual('0.00')
  })

  it('should return 123.00 when the value is 123abc,./', function() {
    expect(f.formatPrice('123abc,./')).toEqual('123.00')
  })

  it('should return 1,123.12 when the value is 123.123.123.123', function() {
    expect(f.formatPrice('1123.123.123.123')).toEqual('1,123.12')
  })

  it('should return 999,999,999.00 when the value is 99999999999', function() {
    expect(f.formatPrice('99999999999')).toEqual('999,999,999.00')
  })

  it('should return 999,999,999.99 when the value is 99999999999.999', function() {
    expect(f.formatPrice('99999999999.999')).toEqual('999,999,999.99')
  })

  it('should return 123,456,789.60 when the value is 123456789.6', function() {
    expect(f.formatPrice('123456789.60')).toEqual('123,456,789.60')
  })

  it('should return 0.06 when the value is .06', function() {
    expect(f.formatPrice('.06')).toEqual('0.06')
  })

  it('should return 10.00 when the value is 00010', function() {
    expect(f.formatPrice('00010')).toEqual('10.00')
  })

  it('should return -123,456 when the value is -123456', function() {
    expect(f.formatPrice('-123456')).toEqual('-123,456.00')
  })
})

describe('2. use custom options', function() {
  const f = new FormatPrice({
    separator: ' ',
    maxIntegerLength: 10,
    decimalPlaces: 0,
    separatorIndexs: [3, 5, 7, 9, 11, 13]
  });

  it('should return 12 34 567 when the value is 1234567', function() {
    expect(f.formatPrice('1234567')).toEqual('12 34 567')
  })

  it('should return 12 when the value is 12.8765', function() {
    expect(f.formatPrice('12.8765')).toEqual('12')
  })

  it('should return -1 000 when the value is -1000', function() {
    expect(f.formatPrice('-1000')).toEqual('-1 000')
  })
})