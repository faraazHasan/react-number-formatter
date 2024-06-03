import { ISeperators, ICountryList } from './t'

export const getSeperatorsPositions = (format: string) => {
  const seperators: ISeperators[] = []
  let prefixIndexes: any = []
  let prefix = ''
  let justSymbols = ''
  let countryCode = '+'

  for (let i = 0; i < format.length; i++) {
    if (format[i] !== '#') {
      seperators.push({
        index: i,
        symbol: format[i],
      })
      if (!Number(format[i])) {
        justSymbols += format[i]
      }
      if (prefixIndexes.length) {
        if (i - prefixIndexes[prefixIndexes.length - 1] === 1) {
          prefixIndexes.push(i)
        }
      } else {
        prefixIndexes.push(i)
      }
    }
  }
  if (!prefixIndexes.includes(0)) {
    prefixIndexes = []
  }
  if (prefixIndexes.length) {
    for (let i = 0; i < prefixIndexes.length; i++) {
      prefix += format[i]
      if(!isNaN(+format[i])) {
        countryCode+=format[i]
      }
    }
  }
  return { seperators, prefixIndexes, prefix, justSymbols,countryCode }
}

export const getDefaultCountry = (
  countries: ICountryList[],
  ar: any,
  defaultCountry?: string,
  onlyCountries?: string[],
  value?: string,
  autoFormat?: boolean,
  includeDialingCode?: boolean,
  customFormat?: string | undefined
): any => {
  const text = String(value)
  let format: ICountryList = {
    c: '',
    f: '',
    n: '',
    d: '',
    p: '',
    fg: '',
    c_sm: '',
  }
  if(customFormat !== undefined) {
     format = {
      c: '',
      f: customFormat,
      n: '',
      d: customFormat.slice(0, customFormat.indexOf(" ")),
      p: '',
      fg: '',
      c_sm: '',
    }
    return format
  }
  if (autoFormat && (includeDialingCode || includeDialingCode === undefined)) {
    for (let i = 0; i < countries.length; i++) {
      const pre = countries[i].d.slice(1, countries[i].d.length)
      if (text.startsWith(pre)) {
        return {
          c: pre === "1" ? "USA" : countries[i].c,
          f: countries[i].f,
          n: pre === "1" ? "United states" : countries[i].n,
          d: countries[i].d,
          p: countries[i].p,
          fg: pre === "1" ? "http://flags.fmcdn.net/data/flags/mini/us.png" : countries[i].fg,
          c_sm: pre === "1" ? "US" : countries[i].c_sm,
        }
      }
    }
  }
  
  if (defaultCountry) {
    ar.forEach((c: any) => {
      if (
        c['c'] === defaultCountry?.toUpperCase() ||
        c['n'] === defaultCountry?.toLowerCase() ||
        c['c_sm'] === defaultCountry?.toUpperCase()
      ) {
        format = {
          c: c['c'],
          f: c['f'],
          n: c['n'],
          d: c['d'],
          p: c['p'],
          fg: c['fg'],
          c_sm: c['c_sm'],
        }
      }
    })
  } else if (onlyCountries) {
    ar.forEach((c: any) => {
      if (
        c['c'] === (onlyCountries as string[])[0].toUpperCase() ||
        c['c_sm'] === (onlyCountries as string[])[0].toUpperCase()
      ) {
        format = {
          c: c['c'],
          f: c['f'],
          n: c['n'],
          d: c['d'],
          p: c['p'],
          fg: c['fg'],
          c_sm: c['c_sm'],
        }
      }
    })
  }
  if (!format.c) {
    format = {
      c: 'IND',
      f: '+91 ####-######',
      n: 'India',
      d: '+91',
      p: '+91 7014-547733',
      fg: 'http://flags.fmcdn.net/data/flags/mini/in.png',
      c_sm: 'IN',
    }
  }
  return format
}

export function compare( a: any, b: any ) {
  const left = Number(a.d.slice(1, a.d.length));
  const right = Number(b.d.slice(1, b.d.length));
  if ( left > right ){
    return -1;
  }
  if ( left < right ){
    return 1;
  }
  return 0;
}
