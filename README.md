# react-number-formatter
This react input component automatically formats phone numbers inside input and returns the number you actually typed.

## Installation

Run this command in your terminal

```bash
npm add react-number-formatter
```


| Props | Description |
| --- | --- |
| getCountryCode | To get selected country code |
| format | To create your own format |
| defaultCountry | To make a country default selected |
| onlyCountries | To filter country options |
| fixLength | To limit input length |
| disabled | To make input and selector disable|
| fullIsoCode | Sets 3 letter ISO Code e.g. "IND", "USA"|
| searchOption | To add or remove search bar|
| register | To use this input inside react-hook-form|
| flags: Boolean | To get country code instead of flag |
| placeholder: String | To change placeholder |
| initialFormat: Boolean | When using this component in editable forms. this function automatically guess the the dial code and formats the number|

## Usage

```typescript
import { NumberFormatter } from 'react-number-formatter';
```

```javascript
const [number, setNumber] = useState();
```
```typescript
//for typescript
const [number, setNumber] = useState<string | number>();
```
<img width="764" alt="Screenshot 2023-05-14 at 1 55 15 PM" src="https://github.com/faraazHasan/react-number-formatter/assets/83122437/8c5d05d2-98d1-4671-89c3-d6456185e46d">


#
```typescript
<NumberFormatter
  value={number}
  initialFormat={true}
  getValue={(n: string) => setNumber(n)}
/> 
```
![Screen Recording 2023-05-14 at 2 03 26 PM](https://github.com/faraazHasan/react-number-formatter/assets/83122437/928e0417-636c-4148-85d2-170e641fc421)


## You can create your own format too. 
```typescript
<NumberFormatter
  format={"+1 (###)-(###)-####"}
  value={number}
  getValue={(n: string) => setNumber(n)}
/> 
```
![Screen_Recording_2023-02-19_at_8_03_19_PM_AdobeExpress](https://user-images.githubusercontent.com/83122437/219955776-cb8be17d-df94-40b5-b872-9382c24a9187.gif)
