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
| inputClass | To style input. |
| selectorClass | To style select button |
| menuClass | To style drop down menu |
| format | To create your own format |
| defaultCountry | To make a country default selected |
| onlyCountries | To filter country options |
| fixLength | To limit input length |
| disabled | To make input and selector disable|


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



#
```typescript
<NumberFormatter
  value={number}
  getValue={(n) => setNumber(n)}
/> 
```
![allOptions_AdobeExpress](https://user-images.githubusercontent.com/83122437/216813721-b3558a83-441d-412d-ad02-9830f067fa68.gif)




#
```typescript
<NumberFormatter
  defaultCountry="USA" 
  onlyCountries={["USA", "IND"]}
  value={number}
  getValue={(n) => setNumber(n)}
/> 
```
![limitedOptions_AdobeExpress](https://user-images.githubusercontent.com/83122437/216813737-fd559373-e3bd-4b57-8d3e-988e22638ea8.gif)




#### make fixLength "false" to add number bigger than fotmat.length
```typescript
<NumberFormatter
  defaultCountry="USA"
  fixLength={false}
  value={number}
  getValue={(n) => setNumber(n)}
/> 
```
![fixedLengthFalse_AdobeExpress](https://user-images.githubusercontent.com/83122437/216813752-93ed1a96-f525-4331-b017-aee05c635ae5.gif)




## You can create your own format too. 
```typescript
<NumberFormatter
  format={"+1 (###)-(###)-####"}
  value={number}
  getValue={(n) => setNumber(n)}
/> 
```
![record1_AdobeExpress](https://user-images.githubusercontent.com/83122437/216813761-4b559a1b-1420-4eb8-9a71-1598cb3bf8a1.gif)


