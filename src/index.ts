import { ERROR_LEVEL } from './constants';

export interface FormatPriceOptions {
  // Thousands separator, like ","
  separator?: string;
  // The number of decimal places, like 2 means 100.00、 1 means 100.0
  decimalPlaces?: number | string;
  // This rule means how many numbers should we add a separator charactor, for example: [3, 6, 9, 12] -> 123,456,789,000  [3, 5, 7, 9] -> 12,34,56,789
  separatorIndexs?: number[];
  // THe max length of integer part that we should show.
  maxIntegerLength?: number;
}

const DEFAULT_SEPARATOR = ',';
const DEFAULT_DECIMAL_PLACES = 2;
const DEFAULT_SEPARATOR_INDEXS = undefined;
const DEFAULT_MAX_INTEGER_LENGTH = 9;

export default class FormatPrice {
  _separator: string = DEFAULT_SEPARATOR;
  _decimalPlaces: number = DEFAULT_DECIMAL_PLACES;
  _separatorIndexs: undefined | number[] = DEFAULT_SEPARATOR_INDEXS;
  _maxIntegerLength: number = DEFAULT_MAX_INTEGER_LENGTH;
  constructor(initOptions?: FormatPriceOptions) {
    if (!initOptions) {
      return;
    }
    this.setOptions(Object.assign({}, {
      separator: DEFAULT_SEPARATOR,
      decimalPlaces: DEFAULT_SEPARATOR,
      separatorIndexs: DEFAULT_SEPARATOR_INDEXS,
      maxIntegerLength: DEFAULT_MAX_INTEGER_LENGTH
    }, initOptions));
  }

  // throw message to user
  _throwMsg(message: string, level?: ERROR_LEVEL) {
    switch (level) {
      case ERROR_LEVEL.ERROR:
        console.error(`[format price error]: ${message}`);
        break;
      case ERROR_LEVEL.WARNING:
        console.warn(`[format price warning]: ${message}`);
        break;
      default:
        console.log(`[format price info]: ${message}`);
        break;
    }
  }

  // get zero number in current options
  _getZero() {
    if (typeof this._decimalPlaces !== 'number') {
      this._throwMsg('decimalPlaces must be a number', ERROR_LEVEL.WARNING);
      return '0';
    }
    return this._decimalPlaces === 0 ? '0' : `0.${'0'.repeat(this._decimalPlaces)}`;
  }

  _addSeparatorToInteger(value: string) {
    if (!this._separatorIndexs || !Array.isArray(this._separatorIndexs) || this._separatorIndexs.length <= 0) {
      return value.replace(/(?=(\B\d{3})+$)/g, this._separator);
    }

    return this._separatorIndexs.map((_, i) => {
      return value
        .split('')
        .reverse()
        .join('')
        .slice(this._separatorIndexs[i - 1] || 0, this._separatorIndexs[i])
    }).filter(j => !!j)
      .join(this._separator)
      .split('')
      .reverse()
      .join('')
  }

  // set user's options
  setOptions(options: FormatPriceOptions) {
    const { separator, decimalPlaces, separatorIndexs, maxIntegerLength } = options;
    this._separator = separator;
    this._separatorIndexs = separatorIndexs;
    this._maxIntegerLength = maxIntegerLength;
    const NnumberedDecimalPlaces = Number(decimalPlaces);
    if (isNaN(NnumberedDecimalPlaces)) {
      this._decimalPlaces = DEFAULT_DECIMAL_PLACES;
      this._throwMsg('decimalPlaces must be a number', ERROR_LEVEL.WARNING);
    } else {
      this._decimalPlaces = NnumberedDecimalPlaces;
    }
  }

  // return formated price string
  formatPrice(price: number | string) {
    const value = parseFloat(String(price));
    // start with invalid character
    if (isNaN(value)) {
      return this._getZero();
    }

    // value equal to zero
    if (value === 0) {
      return this._getZero();
    }

    const split = value.toString().split('.');

    // a normal number
    const integer = split[0];
    const decimal = split[1] || '';

    // the integer part is too long
    if (integer.length > this._maxIntegerLength) {
      const slicedInteger = integer.slice(integer.length - this._maxIntegerLength, integer.length);
      if(this._decimalPlaces <= 0) {
        return this._addSeparatorToInteger(slicedInteger.toString());
      }
      const slicedDecimal = decimal.slice(0, this._decimalPlaces);
      return this._addSeparatorToInteger(slicedInteger.toString())
         + `.${(slicedDecimal || '').padEnd(this._decimalPlaces, '0')}`
    }

    // the decimal part is too long
    if(decimal && decimal.length > this._decimalPlaces) {
      const slicedDecimal = decimal.slice(0, this._decimalPlaces);
      return this._addSeparatorToInteger(integer.toString()) + `.${slicedDecimal}`;
    }

    // a valid number
    const showInteger = this._addSeparatorToInteger(integer.toString());
    const showDecimal = this._decimalPlaces > 0 ? `.${(decimal || '').padEnd(this._decimalPlaces, '0')}` : '';
    return showInteger + showDecimal;
  }

}