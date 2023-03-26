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

## Example: Inside React-hook-form

#
```typescript
<NumberFormatter 
  register={{...register('number')}}
  value={phone}
  getValue={(n)=> setPhone(n)}
/>
```

## Normal use

#
```typescript
<NumberFormatter
  value={number}
  getValue={(n) => setNumber(n)}
  fullIsoCode={true}
/> 
```

#
```typescript
<NumberFormatter
  value={number}
  getValue={(n) => setNumber(n)}
  fullIsoCode={true}
/> 
```
https://user-images.githubusercontent.com/83122437/221404227-d350f2db-3ff5-4f67-945c-f3c694c4e587.mov

![Screen_Recording_2023-02-26_at_3_15_51_PM_AdobeExpress](https://user-images.githubusercontent.com/83122437/221404674-44f3d567-8b28-4850-8276-d62aa97af423.gif)



#
```typescript
<NumberFormatter
  defaultCountry="USA" 
  onlyCountries={["USA", "IND"]}
  value={number}
  fullIsoCode={true}
  searchOption={false}
  getValue={(n) => setNumber(n)}
/> 
```
![Screen_Recording_2023-02-19_at_8_16_35_PM_AdobeExpress](https://user-images.githubusercontent.com/83122437/219955707-a44a2a5e-d4c1-443c-a80f-72655455404c.gif)




#### make fixLength "false" to add number bigger than fotmat.length
```typescript
<NumberFormatter
  defaultCountry="USA"
  fixLength={false}
  value={number}
  fullIsoCode={true}
  searchOption={false}
  getValue={(n) => setNumber(n)}
/> 
```
![Screen_Recording_2023-02-19_at_8_01_58_PM_AdobeExpress](https://user-images.githubusercontent.com/83122437/219955783-8f668d77-e99e-4564-bc03-d106b937b6d6.gif)





## You can create your own format too. 
```typescript
<NumberFormatter
  format={"+1 (###)-(###)-####"}
  value={number}
  getValue={(n) => setNumber(n)}
/> 
```
![Screen_Recording_2023-02-19_at_8_03_19_PM_AdobeExpress](https://user-images.githubusercontent.com/83122437/219955776-cb8be17d-df94-40b5-b872-9382c24a9187.gif)
