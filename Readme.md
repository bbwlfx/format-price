## About this
This is a simple util to help you format the price number to show.

## How to install

```
npm install simple-format-price@latest
or
yarn add simple-format-price@latest
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

input: 98765432100.987
output: 765,432,100.98

input: 1000000000000000
output: 0.00
```


## 关于
这是一个非常简单的工具，可以帮你格式化要展示的货币金额

## 如何安装

```
npm install simple-format-price@latest
or
yarn add simple-format-price@latest
```

## 如何使用
```
import FormatPrice from 'simple-format-price';

const format = new FormatPrice();

format.formatPrice('123456789'); // 123,456,789
```
## 参数介绍

## Options

|参数|类型|默认值|是否必选|其他说明|
|-----|----|------------|--------|-----|
|seperator|string|','|No|千分位分隔符，比如： ","|
|decimalPlaces|number|2|No|T小数点位数,比如：2 代表 100.00、 1 代表 100.0|
|separatorIndexs|number[]|undefined|No|加千分位分隔符的位置（在某些国家下并不都是3位一分隔），比如: [3, 6, 9, 12] -> 123,456,789,000  [3, 5, 7, 9] -> 12,34,56,789|
|maxIntegerLength|number|9|No|最大展示整数部分的长度|

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


## 举例
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

input: 98765432100.987
output: 765,432,100.98

input: 1000000000000000
output: 0.00
```