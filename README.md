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
| initialFormat: Boolean | When using this component in editable forms. this function automatically guess the the dial code and formats the number|
| disabled | To make input and selector disable|
| fullIsoCode | Sets 3 letter ISO Code e.g. "IND", "USA"|
| searchOption | To add or remove search bar|
| flags: Boolean | To get country code instead of flag |
| placeholder: String | To change placeholder |


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
<img width="764" alt="Screenshot 2023-05-14 at 1 55 15 PM" src="https://github.com/faraazHasan/react-number-formatter/assets/83122437/3744fd5e-dc45-430a-99d1-7c730038a537">


#### make fixLength "false" to add number bigger than fotmat.length
```typescript
<NumberFormatter
  value={number}
  initialFormat={true}
  getValue={(n) => setNumber(n)}
/> 
```

![Screen Recording 2023-05-14 at 2 03 26 PM](https://github.com/faraazHasan/react-number-formatter/assets/83122437/f501ee65-0e8c-45af-8bf2-64a1c02aaf5f)

## You can create your own format too. 
```typescript
<NumberFormatter
  format={"+1 (###)-(###)-####"}
  value={number}
  getValue={(n) => setNumber(n)}
/> 
```
![Screen_Recording_2023-02-19_at_8_03_19_PM_AdobeExpress](https://user-images.githubusercontent.com/83122437/219955776-cb8be17d-df94-40b5-b872-9382c24a9187.gif)


