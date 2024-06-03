import React, { useRef, useEffect, useState } from "react";
import {c} from "./c";
import { getSeperatorsPositions, getDefaultCountry, compare } from "./m";
import { ICountryList, NumberFormatterProps, IFormat } from "./t";
import "./i.css";
import { CountrySelector } from "./CountrySelector";

export const NumberFormatter: React.FC<NumberFormatterProps> = (props: NumberFormatterProps) => {
    const {
      value,
      getValue,
      format: formatFromProps,
      defaultCountry: defaultCountryFromProps,
      onlyCountries,
      fixLength,
      disabled,
      searchOption,
      fullIsoCode,
      getCountryCode,
      name,
      placeholder,
      prefix: prefixFromProps,
      initialFormat,
      includeDialingCode,
      register,
      flags,
      onBlur
    } = props
    const [newCountries] = useState<ICountryList[]>([...c].sort(compare));
    const [defaultCountry] = useState<ICountryList>(
        getDefaultCountry(
          newCountries,
          c,
          defaultCountryFromProps,
          onlyCountries,
          String(value),
          initialFormat,
          includeDialingCode
        ),
      )
      const [countryCode, setCountryCode] = useState<string>(()=> {
        if(formatFromProps !== undefined) {
          const {countryCode} = getSeperatorsPositions(formatFromProps)
          return countryCode
        }
        else {
          return defaultCountry.d
        }
      })
    const [format, setFormat] = useState<IFormat>({
        format: formatFromProps ? formatFromProps : defaultCountry.f,
        placeholder: placeholder ? placeholder : defaultCountry.p,
      })
    const [fixedLength] = useState<boolean>(fixLength || fixLength === undefined ? true : false);
    const inputElm = useRef<HTMLInputElement>();
    getCountryCode && getCountryCode(countryCode);

    useEffect(() => {
      if(inputElm.current) {
        getRawNumber(inputElm.current.value)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [format])
    
    const ondown = async (key: string, e: React.KeyboardEvent<HTMLInputElement>) => {
        const { seperators, prefixIndexes, prefix, justSymbols } = getSeperatorsPositions(format.format)
        const validKeys = /([0-9]|Backspace|ArrowLeft|ArrowRight|Control|v|c|x)/g
        const validateNumber = /[0-9]/g
        const isValidKey = key.match(validKeys)
        const isValidNumber = key.match(validateNumber)
        const text = window.getSelection()?.toString()
        const addNum = () => {
          if (e.currentTarget.selectionStart || e.currentTarget.selectionStart === 0) {
            if (!fixedLength) {
              if (text && text?.length) {
                e.currentTarget.setRangeText(
                  key,
                  e.currentTarget.selectionStart,
                  e.currentTarget.selectionStart + text.length,
                  'preserve',
                )
                updateNumber(e.currentTarget)
              }
              for (let i = 0; i < seperators.length; i++) {
                if (e.currentTarget.selectionStart === seperators[i].index) {
                  e.currentTarget.setRangeText(
                    seperators[i].symbol,
                    e.currentTarget.selectionStart,
                    e.currentTarget.selectionStart + seperators[i].symbol.length,
                    'end',
                  )
                }
              }
              e.currentTarget.setRangeText(key, e.currentTarget.selectionStart, e.currentTarget.selectionStart + 1, 'end')
            } else if (e.currentTarget.selectionStart < format.format.length) {
              if (text && text?.length) {
                e.currentTarget.setRangeText(
                  key,
                  e.currentTarget.selectionStart,
                  e.currentTarget.selectionStart + text.length,
                  'preserve',
                )
                updateNumber(e.currentTarget)
              }
              for (let i = 0; i < seperators.length; i++) {
                if (e.currentTarget.selectionStart === seperators[i].index) {
                  e.currentTarget.setRangeText(
                    seperators[i].symbol,
                    e.currentTarget.selectionStart,
                    e.currentTarget.selectionStart + seperators[i].symbol.length,
                    'end',
                  )
                }
              }
              e.currentTarget.setRangeText(key, e.currentTarget.selectionStart, e.currentTarget.selectionStart + 1, 'end')
            }
          }
        }
    
        if (isValidKey) {
          if (key === 'Backspace') {
            if (e.currentTarget.selectionEnd && !prefixIndexes.includes(e.currentTarget.selectionEnd - 1)) {
              if (e.currentTarget.selectionStart && e.currentTarget.selectionStart <= prefix.length) {
                e.currentTarget.selectionStart = prefix.length
              }
              if (e.currentTarget.selectionStart || e.currentTarget.selectionStart === 0) {
                if (e.currentTarget.selectionStart !== e.currentTarget.selectionEnd) {
                  e.currentTarget.setRangeText('', e.currentTarget.selectionStart, e.currentTarget.selectionEnd, 'end')
                  updateNumber(e.currentTarget)
                } else {
                  e.currentTarget.setRangeText('', e.currentTarget.selectionEnd - 1, e.currentTarget.selectionEnd, 'end')
                  updateNumber(e.currentTarget)
                }
                getRawNumber(e.currentTarget.value)
              }
            }
          }
          if (isValidNumber) {
            addNum()
            getRawNumber(e.currentTarget.value)
            e.preventDefault()
          } else if (
            e.currentTarget.selectionEnd &&
            key === 'ArrowLeft' &&
            justSymbols.includes(e.currentTarget.value[e.currentTarget.selectionEnd - 2]) &&
            e.currentTarget.selectionEnd > prefix.length
          ) {
            e.currentTarget.selectionEnd = e.currentTarget.selectionEnd - 1
          } else if (e.currentTarget.selectionEnd && key === 'ArrowLeft' && e.currentTarget.selectionEnd < prefix.length) {
            e.preventDefault()
          } else if (
            e.currentTarget.selectionStart &&
            key === 'ArrowRight' &&
            justSymbols.includes(e.currentTarget.value[e.currentTarget.selectionStart + 1]) &&
            e.currentTarget.selectionStart > prefix.length
          ) {
            e.currentTarget.selectionStart = e.currentTarget.selectionStart + 2
          } else if (!e.ctrlKey && !e.metaKey && key !== 'ArrowLeft' && key !== 'ArrowRight') {
            e.preventDefault()
          }
        } else {
          e.preventDefault()
        }
      }
    
      const arrangeNumber = (value: string) => {
        let trimmedText = ''
        const { seperators, prefix } = getSeperatorsPositions(format.format)
        if (value && prefix.length && value.includes(prefix)) {
          const slicedValue = value.slice(prefix.length, value.length)
          const slicedDividers = seperators.slice(prefix.length, seperators.length)
          for (let i = 0; i < slicedDividers.length; i++) {
            slicedDividers[i].index = slicedDividers[i].index - prefix.length
          }
          for (let i = 0; i < slicedValue.length; i++) {
            if (
              (Number(slicedValue[i]) && slicedValue[i] !== '+' && slicedValue[i] !== '-' && slicedValue[i] !== '.') ||
              slicedValue[i] === '0'
            ) {
              trimmedText += slicedValue[i]
            }
          }
        } else {
          if (value) {
            for (let i = 0; i < value.length; i++) {
              if ((Number(value[i]) && value[i] !== '+' && value[i] !== '-' && value[i] !== '.') || value[i] === '0') {
                trimmedText += value[i]
              }
            }
          }
        }
        let dividersLength = 0
        for (let i = 0; i < seperators.length; i++) {
          dividersLength += seperators[i].symbol.length
        }
        const slice = fixedLength ? trimmedText.slice(0, format.format.length - dividersLength) : trimmedText
        const split = Array.from(slice)
        return seperateNumbers(split as string[])
      }
    
      const seperateNumbers = (value: string[]) => {
        const { seperators, prefix } = getSeperatorsPositions(format.format)
        let j = 0
        for (let i = 0; i < value.length; i++) {
          if (seperators[j]) {
            if (i === seperators[j].index) {
              value.splice(seperators[j].index, 0, seperators[j].symbol)
              j++
            }
          }
        }
        let modifiedNumber: string
        if (prefixFromProps) {
          if (!value.length && prefix) {
            if (prefix[prefix.length] === '(') {
              const val = prefix.slice(0, prefix.length - 1)
              modifiedNumber = val
            } else if (prefix[prefix.length - 1] === '(') {
              const val = prefix.slice(0, prefix.length - 2)
              modifiedNumber = val
            } else {
              modifiedNumber = prefix
            }
          } else {
            modifiedNumber = value.join('')
          }
          return modifiedNumber
        }
        modifiedNumber = value.join('')
        return modifiedNumber
      }
      const getRawNumber = (value: string) => {
        const { seperators, prefix } = getSeperatorsPositions(format.format)
        if (prefix.length && value.includes(prefix)) {
          const slicedValue = value.slice(prefix.length, value.length)
          const slicedDividers = seperators.slice(prefix.length, seperators.length)
          for (let i = 0; i < slicedDividers.length; i++) {
            slicedDividers[i].index = slicedDividers[i].index - prefix.length
          }
          const valAray = Array.from(slicedValue)
          let newValue = ''
          for (let i = 0; i < valAray.length; i++) {
            if (slicedDividers.length) {
              if (i === slicedDividers[0].index) {
                valAray.slice(slicedDividers[0].index, 0)
                slicedDividers.shift()
              } else {
                newValue += valAray[i]
              }
            } else {
              newValue += valAray[i]
            }
          }
          if ((includeDialingCode === undefined || includeDialingCode) && newValue.length) {
            getValue && getValue(countryCode.slice(1, countryCode.length) + newValue)
          } else {
            getValue && getValue(newValue)
          }
        } else {
          const valAray = Array.from(value)
          let newValue = ''
          for (let i = 0; i < valAray.length; i++) {
            if (seperators.length) {
              if (i === seperators[0].index) {
                valAray.slice(seperators[0].index, 0)
                seperators.shift()
              } else {
                newValue += valAray[i]
              }
            } else {
              newValue += valAray[i]
            }
          }
         
          
          if ((includeDialingCode === undefined || includeDialingCode) && newValue.length) {
            getValue && getValue(countryCode.slice(1, countryCode.length) + newValue)
          } else {
            getValue && getValue(newValue)
          }
        }
      }
      const onpaste = async (e: React.ClipboardEvent<HTMLInputElement>) => {
        let start = e.currentTarget.selectionStart as number
        const target = e.currentTarget
        const copiedText = await e.clipboardData.getData('Text')
        const value = copiedText
        const text = window.getSelection()?.toString()
        const { prefix } = getSeperatorsPositions(format.format)
        let trimmedText = ''
        for (let i = 0; i < value.length; i++) {
          if ((Number(value[i]) && value[i] !== '+' && value[i] !== '-' && value[i] !== '.') || value[i] === '0') {
            trimmedText += value[i]
          }
        }
        if (start <= prefix.length) {
          target.setRangeText(prefix, 0, prefix.length, 'end')
          start = prefix.length
        }
        if (text?.length) {
          target.setRangeText(trimmedText, start, start + text.length, 'end')
          updateNumber(target)
        } else {
          target.setRangeText(trimmedText, start, start, 'end')
          updateNumber(target)
        }
        getRawNumber(target.value)
        e.preventDefault()
      }
    
      const oncut = async (e: React.ClipboardEvent<HTMLInputElement>) => {
        const start = e.currentTarget.selectionStart;
        const end = e.currentTarget.selectionEnd;
        const value = e.currentTarget.value
        if(start && end) {
          const copiedText = e.currentTarget.value.slice(start, end)
          navigator.clipboard.writeText(copiedText)
          const newValue = value.substring(0,start) +  value.substring(end,value.length)
          e.currentTarget.value = newValue;
          e.currentTarget.selectionStart = start
          e.currentTarget.selectionEnd = start
        }
        updateNumber(e.currentTarget)
        getRawNumber(e.currentTarget.value)
        e.preventDefault()
      }
    
      const onclick = (e: React.MouseEvent<HTMLInputElement>) => {
        const { justSymbols } = getSeperatorsPositions(format.format)
        const { prefix } = getSeperatorsPositions(format.format)
        if (
          prefix &&
          (e.currentTarget.selectionStart || e.currentTarget.selectionStart === 0) &&
          e.currentTarget.selectionStart < prefix.length
        ) {
          if (e.currentTarget.value[prefix.length - 1] === '(') {
            e.currentTarget.selectionStart = prefix.length - 1
          } else {
            e.currentTarget.selectionStart = prefix.length
          }
        } else if (
          prefix &&
          e.currentTarget.selectionEnd &&
          justSymbols.includes(e.currentTarget.value[e.currentTarget.selectionEnd - 1]) &&
          e.currentTarget.selectionEnd > prefix.length
        )
          e.currentTarget.selectionEnd = e.currentTarget.selectionEnd - 1
      }
    
      const updateNumber = (target: HTMLInputElement) => {
        const { prefix } = getSeperatorsPositions(format.format)
        const getStart = target.selectionStart
        const getEnd = target.selectionEnd
        target.value = arrangeNumber(target.value)
        if (target.value.length === prefix.length) {
          target.selectionEnd = prefix.length
          target.selectionStart = prefix.length
        } else {
          target.selectionStart = getStart
          target.selectionEnd = getEnd
        }
      }
    
      const inputValue = (value: string | number) => {
        let text = String(value)
        if (includeDialingCode === undefined || includeDialingCode) {
          if(formatFromProps) {
            const pre = countryCode.slice(1, countryCode.length)
            if (text.startsWith(pre)) {
              text = value.toString().slice(countryCode.length - 1, text.length)
              return arrangeNumber(text)
            }
          }
          for (let i = 0; i < newCountries.length; i++) {
            const pre = newCountries[i].d.slice(1, newCountries[i].d.length)
            if (text.startsWith(pre)) {
              text = value.toString().slice(newCountries[i].d.length - 1, text.length)
              return arrangeNumber(text)
            }
          }
        }
        return arrangeNumber(text)
      }

    const inputStyle = formatFromProps ?{borderRadius:"4px",padding: "0.275rem 0.5rem"} : {borderRadius:"0px 4px 4px 0px"};
  
    return (
        <div className="react-number-formatter-form">
            <label>
            {!formatFromProps && (
            <CountrySelector
                disabled={disabled}
                fullIsoCode={fullIsoCode}
                searchOption={searchOption}
                defaultCountry={defaultCountry}
                onlyCountries={onlyCountries}
                setCountryCode={(code: string) => setCountryCode(code)}
                setFormat={(value: IFormat) => setFormat(value)}
                mainInput={inputElm.current}
                flags={flags}
            />
            )}
            </label>
            <input
                ref={(ref: HTMLInputElement) => inputElm.current = ref}
                disabled={disabled}
                type="tel"
                className={"react-number-formatter-input"}
                style={inputStyle}
                value={inputValue(value as string)}
                onKeyDown={e => ondown(e.key, e)}
                onPaste={e => onpaste(e)}
                placeholder={format.placeholder}
                onChange={e => updateNumber(e.currentTarget)}
                onCut={e => oncut(e)}
                onClick={e => onclick(e)}
                name={name}
                onBlur={onBlur}
                {...register}
            />
        </div>
    );
};
