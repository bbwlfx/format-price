"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var DEFAULT_SEPARATOR = ',';
var DEFAULT_DECIMAL_PLACES = 2;
var DEFAULT_SEPARATOR_INDEXS = undefined;
var DEFAULT_MAX_INTEGER_LENGTH = 9;
var FormatPrice = /** @class */ (function () {
    function FormatPrice(initOptions) {
        this._separator = DEFAULT_SEPARATOR;
        this._decimalPlaces = DEFAULT_DECIMAL_PLACES;
        this._separatorIndexs = DEFAULT_SEPARATOR_INDEXS;
        this._maxIntegerLength = DEFAULT_MAX_INTEGER_LENGTH;
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
    FormatPrice.prototype._throwMsg = function (message, level) {
        switch (level) {
            case constants_1.ERROR_LEVEL.ERROR:
                console.error("[format price error]: " + message);
                break;
            case constants_1.ERROR_LEVEL.WARNING:
                console.warn("[format price warning]: " + message);
                break;
            default:
                console.log("[format price info]: " + message);
                break;
        }
    };
    // get zero number in current options
    FormatPrice.prototype._getZero = function () {
        if (typeof this._decimalPlaces !== 'number') {
            this._throwMsg('decimalPlaces must be a number', constants_1.ERROR_LEVEL.WARNING);
            return '0';
        }
        return this._decimalPlaces === 0 ? '0' : "0." + '0'.repeat(this._decimalPlaces);
    };
    FormatPrice.prototype._addSeparatorToInteger = function (value) {
        var _this = this;
        if (!this._separatorIndexs || !Array.isArray(this._separatorIndexs) || this._separatorIndexs.length <= 0) {
            return value.replace(/(?=(\B\d{3})+$)/g, this._separator);
        }
        return this._separatorIndexs.map(function (_, i) {
            return value
                .split('')
                .reverse()
                .join('')
                .slice(_this._separatorIndexs[i - 1] || 0, _this._separatorIndexs[i]);
        }).filter(function (j) { return !!j; })
            .join(this._separator)
            .split('')
            .reverse()
            .join('');
    };
    // set user's options
    FormatPrice.prototype.setOptions = function (options) {
        var separator = options.separator, decimalPlaces = options.decimalPlaces, separatorIndexs = options.separatorIndexs, maxIntegerLength = options.maxIntegerLength;
        this._separator = separator;
        this._separatorIndexs = separatorIndexs;
        this._maxIntegerLength = maxIntegerLength;
        var NnumberedDecimalPlaces = Number(decimalPlaces);
        if (isNaN(NnumberedDecimalPlaces)) {
            this._decimalPlaces = DEFAULT_DECIMAL_PLACES;
            this._throwMsg('decimalPlaces must be a number', constants_1.ERROR_LEVEL.WARNING);
        }
        else {
            this._decimalPlaces = NnumberedDecimalPlaces;
        }
    };
    // return formated price string
    FormatPrice.prototype.formatPrice = function (price) {
        var value = parseFloat(String(price));
        // start with invalid character
        if (isNaN(value)) {
            return this._getZero();
        }
        // value equal to zero
        if (value === 0) {
            return this._getZero();
        }
        var split = value.toString().split('.');
        // a normal number
        var integer = split[0];
        var decimal = split[1] || '';
        // the integer part is too long
        if (integer.length > this._maxIntegerLength) {
            var slicedInteger = integer.slice(integer.length - this._maxIntegerLength, integer.length);
            if (this._decimalPlaces <= 0) {
                return this._addSeparatorToInteger(slicedInteger.toString());
            }
            var slicedDecimal = decimal.slice(0, this._decimalPlaces);
            return this._addSeparatorToInteger(slicedInteger.toString())
                + ("." + (slicedDecimal || '').padEnd(this._decimalPlaces, '0'));
        }
        // the decimal part is too long
        if (decimal && decimal.length > this._decimalPlaces) {
            var slicedDecimal = decimal.slice(0, this._decimalPlaces);
            return this._addSeparatorToInteger(integer.toString()) + ("." + slicedDecimal);
        }
        // a valid number
        var showInteger = this._addSeparatorToInteger(integer.toString());
        var showDecimal = this._decimalPlaces > 0 ? "." + (decimal || '').padEnd(this._decimalPlaces, '0') : '';
        return showInteger + showDecimal;
    };
    return FormatPrice;
}());
exports.default = FormatPrice;
