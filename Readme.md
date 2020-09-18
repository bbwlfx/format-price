## About this
This is a simple util to help you format the price number to show.

## How to install

```
npm install simple-format-price@latest
or
yarn add simple-format-price@latest
```

## Example

```
input: 100000000
output: 100,000,000.00

input: 1234abc,./
output: 1,234.00

input: abc123,
output: 0.00

input: 123.9999
output: 123.99

input: 9999999999999
output: 999,999,999.00
```

## How to use
```
import FormatPrice from 'simple-format-price';

const format = new FormatPrice();

format.formatPrice('123456789'); // 123,456,789
```

## Options

|param|type|defaultValue|required|other|
|-----|----|------------|--------|-----|
|seperator|string|','|No|Thousands separator, like ","|
|decimalPlaces|number|2|No|The number of decimal places, like 2 means 100.00、 1 means 100.0|
|separatorIndexs|number[]|undefined|No|This rule means how many numbers should we add a separator charactor, for example: [3, 6, 9, 12] -> 123,456,789,000  [3, 5, 7, 9] -> 12,34,56,789|
|maxIntegerLength|number|9|No|The max length of integer part that we should show.|

```
import FormatPrice from 'simple-format-price';

const format = new FormatPrice({
  separator: ' ',
  decimalPlaces: 0,
  separatorIndexs: [3, 5, 7, 9, 11, 13],
  maxIntegerLength: 10
});

or you can:

const format = new Format();
format.setOptions({
  separator: ' ',
  decimalPlaces: 0,
  separatorIndexs: [3, 5, 7, 9, 11, 13],
  maxIntegerLength: 10
});
```