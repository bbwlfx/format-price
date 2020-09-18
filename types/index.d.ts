import { ERROR_LEVEL } from './constants';
export interface FormatPriceOptions {
    separator?: string;
    decimalPlaces?: number | string;
    separatorIndexs?: number[];
    maxIntegerLength?: number;
}
export default class FormatPrice {
    _separator: string;
    _decimalPlaces: number;
    _separatorIndexs: undefined | number[];
    _maxIntegerLength: number;
    constructor(initOptions?: FormatPriceOptions);
    _throwMsg(message: string, level?: ERROR_LEVEL): void;
    _getZero(): string;
    _addSeparatorToInteger(value: string): string;
    setOptions(options: FormatPriceOptions): void;
    formatPrice(price: number | string): string;
}
