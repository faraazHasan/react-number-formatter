import React, { useRef } from "react";
import { useState } from "react";
import {c} from "./c";
import { getDividersPositions } from "./m";
import { getDefaultCountry } from "./m";
import { ICountryList, NumberFormatterProps } from "./t";
import "../public/styles/index.css";
import { CountrySelector } from "./CountrySelector";

export const NumberFormatter: React.FC<NumberFormatterProps> = (props: NumberFormatterProps) => {
    const [defaultCountry, setDefaultcountry] = useState<ICountryList>(getDefaultCountry(c, props.defaultCountry, props.onlyCountries));
    const [countryCode, setCountryCode] = useState<string>(defaultCountry.d);
    const [format, setFormat] = useState<string>(props.format? props.format : defaultCountry.f);
    const [fixedLength] = useState<boolean>(props.fixLength || props.fixLength === undefined ? true : false);
    const inputElm = useRef<HTMLInputElement>();
    props.getCountryCode && props.getCountryCode(countryCode);
    
    const ondown = async (key: string, e: React.KeyboardEvent<HTMLInputElement>) => {
        const { dividers, prefixIndexes, prefix, justSymbols } = getDividersPositions(format);
        const validKeys = /([0-9]|Backspace|ArrowLeft|ArrowRight|Control|v|c|x)/g;
        const validateNumber = /[0-9]/g;
        const isValidKey = key.match(validKeys);
        const isValidNumber = key.match(validateNumber);
        const text = window.getSelection()?.toString();
        const addNum = () => {
            if (fixedLength) {
                if(e.currentTarget.selectionStart || e.currentTarget.selectionStart === 0 ) {
                    if (e.currentTarget.selectionStart < format.length) {
                        if (text && text?.length) {
                            e.currentTarget.setRangeText(key, e.currentTarget.selectionStart, e.currentTarget.selectionStart + text.length, "preserve");
                            updateNumber(e.currentTarget);
                        }
                        for (let i = 0; i < dividers.length; i++) {
                            if (e.currentTarget.selectionStart === dividers[i].index) {
                                e.currentTarget.setRangeText(dividers[i].symbol, e.currentTarget.selectionStart, e.currentTarget.selectionStart + dividers[i].symbol.length, "end");
                            }
                        }
                        e.currentTarget.setRangeText(key, e.currentTarget.selectionStart, e.currentTarget.selectionStart + 1, "end"); 
                    }
                }
            }
            else {
                if (e.currentTarget.selectionStart && (e.currentTarget.selectionStart || e.currentTarget.selectionStart === 0)) {
                    if (text?.length) {
                        e.currentTarget.setRangeText(key, e.currentTarget.selectionStart, e.currentTarget.selectionStart + text.length, "preserve");
                        updateNumber(e.currentTarget);
                    }
                    for (let i = 0; i < dividers.length; i++) {
                        if (e.currentTarget.selectionStart === dividers[i].index) {
                            e.currentTarget.setRangeText(dividers[i].symbol, e.currentTarget.selectionStart, e.currentTarget.selectionStart + dividers[i].symbol.length, "end");
                        }
                    }
                    e.currentTarget.setRangeText(key, e.currentTarget.selectionStart, e.currentTarget.selectionStart + 1, "end");
                }
            }
        };

        if (isValidKey) {
            if (key === "Backspace") {
                if (e.currentTarget.selectionEnd && (!prefixIndexes.includes(e.currentTarget.selectionEnd - 1))) {
                    if(e.currentTarget.selectionStart && e.currentTarget.selectionStart <= prefix.length) {
                        e.currentTarget.selectionStart = prefix.length;
                    }
                    if(e.currentTarget.selectionStart || e.currentTarget.selectionStart === 0) {
                        if (text?.length) {
                            e.currentTarget.setRangeText("", e.currentTarget.selectionStart, e.currentTarget.selectionEnd, "end");
                            updateNumber(e.currentTarget);
                        }
                        else {
                            e.currentTarget.setRangeText("", e.currentTarget.selectionEnd - 1, e.currentTarget.selectionEnd, "end");
                            updateNumber(e.currentTarget);
                        }
                        getRawNumber(e.currentTarget.value);
                    }
                }
            }
            if (isValidNumber) {
               addNum();
               getRawNumber(e.currentTarget.value);
               e.preventDefault();
            }
            
            else if (e.currentTarget.selectionEnd && key === "ArrowLeft" && justSymbols.includes(e.currentTarget.value[e.currentTarget.selectionEnd - 2]) && e.currentTarget.selectionEnd > prefix.length) {
                e.currentTarget.selectionEnd = e.currentTarget.selectionEnd - 1;
            }
            else if(e.currentTarget.selectionEnd && key === "ArrowLeft" && e.currentTarget.selectionEnd < prefix.length) {
                e.preventDefault();
            }
            else if (e.currentTarget.selectionStart && key === "ArrowRight" && justSymbols.includes(e.currentTarget.value[e.currentTarget.selectionStart + 1]) && e.currentTarget.selectionStart > prefix.length) {
                e.currentTarget.selectionStart = e.currentTarget.selectionStart + 2;
            }
            else if (!e.ctrlKey && !e.metaKey && key !== "ArrowLeft" && key !== "ArrowRight") {
                e.preventDefault();
            }
        }
        else {
            e.preventDefault();
        }
    };

    const arrangeNumber = (value: string) => {
        const { dividers, prefix } = getDividersPositions(format);
        let trimmedText = "";
        if (value && prefix.length && value.includes(prefix)) {
            const slicedValue = value.slice(prefix.length, value.length);
            const slicedDividers = dividers.slice(prefix.length, dividers.length);
            for (let i = 0; i < slicedDividers.length; i++) {
                slicedDividers[i].index = slicedDividers[i].index - prefix.length;
            }
            for (let i = 0; i < slicedValue.length; i++) {
                if ((Number(slicedValue[i]) && slicedValue[i] !== "+" && slicedValue[i] !== "-" && slicedValue[i] !== ".") || slicedValue[i] === "0") {
                    trimmedText += slicedValue[i];
                }
            }
        }
        else {
          if (value) {
            for (let i = 0; i < value.length; i++) {
              if ((Number(value[i]) && value[i] !== "+" && value[i] !== "-" && value[i] !== ".") || value[i] === "0") {
                  trimmedText += value[i];
              }
          }
          }
        }
        let dividersLength = 0;
        for (let i = 0; i < dividers.length; i++) {
            dividersLength += dividers[i].symbol.length;
        }
        const slice = fixedLength ? trimmedText.slice(0, format.length - dividersLength) : trimmedText;
        const split = Array.from(slice);
        return devideNumber(split as string[]);
    };

    const devideNumber = (value: string[]) => {
        const { dividers,prefix } = getDividersPositions(format);
        let j = 0;
        for (let i = 0; i < value.length; i++) {
            if (dividers[j]) {
                if (i === dividers[j].index) {
                    value.splice(dividers[j].index, 0, dividers[j].symbol);
                    j++;
                }
            }
        }
        let modifiedNumber: string;
        if(!value.length && prefix) {
          if(prefix[prefix.length] === "(") {
          const val = prefix.slice(0, prefix.length - 1);
          modifiedNumber = val;
          }
          else if(prefix[prefix.length - 1] === "(") {
          const val = prefix.slice(0, prefix.length - 2);
          modifiedNumber = val;
          }
          else {
            modifiedNumber = prefix;
          }
        }
        else{
          modifiedNumber  = value.join("");
        }
        return modifiedNumber;
    };
    const getRawNumber = (value: string) => {
        const { dividers, prefix } = getDividersPositions(format);
        if (prefix.length && value.includes(prefix)) {
            const slicedValue = value.slice(prefix.length, value.length);
            const slicedDividers = dividers.slice(prefix.length, dividers.length);
            for (let i = 0; i < slicedDividers.length; i++) {
                slicedDividers[i].index = slicedDividers[i].index - prefix.length;
            }
            const valAray = Array.from(slicedValue);
            let newValue = "";

            for (let i = 0; i < valAray.length; i++) {
                if (slicedDividers.length) {
                    if (i === slicedDividers[0].index) {
                        valAray.slice(slicedDividers[0].index, 0);
                        slicedDividers.shift();
                    }
                    else {
                        newValue += valAray[i];
                    }
                }
                else {
                    newValue += valAray[i];
                }
            }
            props.getValue(newValue);
        }
        else {
            const valAray = Array.from(value);
            let newValue = "";
            for (let i = 0; i < valAray.length; i++) {
                if (dividers.length) {
                    if (i === dividers[0].index) {
                        valAray.slice(dividers[0].index, 0);
                        dividers.shift();
                    }
                    else {
                        newValue += valAray[i];
                    }
                }
                else {
                    newValue += valAray[i];
                }
            }
            props.getValue(newValue);
        }
    };
    const onpaste = async (e: React.ClipboardEvent<HTMLInputElement>) => {
        let start = e.currentTarget.selectionStart as number;
        const target = e.currentTarget;
        const copiedText = await e.clipboardData.getData("Text");
        const value = copiedText;
        const text = window.getSelection()?.toString();
        const {prefix} = getDividersPositions(format);
        let trimmedText = "";
        for (let i = 0; i < value.length; i++) {
            if ((Number(value[i]) && value[i] !== "+" && value[i] !== "-" && value[i] !== ".") || value[i] === "0") {
                trimmedText += value[i];
            }
        }
        if(start <= prefix.length) {
            target.setRangeText(prefix, 0, prefix.length, "end");
            start = prefix.length;
        }
        if (text?.length) {
            target.setRangeText(trimmedText, start, start + text.length, "end");
            updateNumber(target);
        } else {
            target.setRangeText(trimmedText, start, start, "end");
            updateNumber(target);
        }
        getRawNumber(target.value);
        e.preventDefault();
    };

    const oncut = async (e: React.ClipboardEvent<HTMLInputElement>) => {
        const text = window.getSelection()?.toString();
        navigator.clipboard.writeText(text ? text : "");
        const {prefix} = getDividersPositions(format);
        if(e.currentTarget.selectionStart && e.currentTarget.selectionStart <= prefix.length) {
            e.currentTarget.setRangeText(prefix, 0, prefix.length, "end");
            e.currentTarget.selectionStart = prefix.length;
        }
        if (e.currentTarget.selectionStart && text?.length) {
            e.currentTarget.setRangeText("", e.currentTarget.selectionStart, e.currentTarget.selectionStart + text.length, "end");
            updateNumber(e.currentTarget);
        }
        getRawNumber(e.currentTarget.value);
        e.preventDefault();
    };

    const inputValue = (value: string | number) => {
        const text = String(value);
        return arrangeNumber(text);
    };

    const onclick = (e: React.MouseEvent<HTMLInputElement>) => {
        const {justSymbols} = getDividersPositions(format);
        const {prefix} = getDividersPositions(format);
        if(prefix && (e.currentTarget.selectionStart || e.currentTarget.selectionStart === 0) && (e.currentTarget.selectionStart < prefix.length)) {
            if(e.currentTarget.value[prefix.length - 1] === "(") {
                e.currentTarget.selectionStart = prefix.length - 1;
            }
            else {
                e.currentTarget.selectionStart = prefix.length;
            }
        }
        else if (prefix && e.currentTarget.selectionEnd && justSymbols.includes(e.currentTarget.value[e.currentTarget.selectionEnd - 1]) && e.currentTarget.selectionEnd > prefix.length)
        e.currentTarget.selectionEnd = e.currentTarget.selectionEnd - 1;
    };

    const updateNumber = (target: HTMLInputElement) => {
        const {prefix} = getDividersPositions(format);
        const getStart = target.selectionStart;
        const getEnd = target.selectionEnd;
        target.value = arrangeNumber(target.value);
        if(target.value.length === prefix.length) {
            target.selectionEnd = prefix.length;
            target.selectionStart = prefix.length;
        }
        else {
            target.selectionEnd = getEnd;
            target.selectionStart = getStart;
        }
    };

    const inputStyle = props.format ?{borderRadius:"4px"} : {borderRadius:"0px 4px 4px 0px"};
  
    return (
        <div className="react-number-formatter-form">
            <label>
           {
            !props.format && 
            <CountrySelector disabled={props.disabled} fullIsoCode={props.fullIsoCode} searchOption={props.searchOption} defaultCountry={defaultCountry} onlyCountries={props.onlyCountries} setCountryCode={(code: string) => setCountryCode(code)} setFormat={(value: string) => setFormat(value)} />
           }
            </label>
            <input
                ref={(ref: HTMLInputElement) => inputElm.current = ref}
                disabled={props.disabled}
                type="tel"
                className={"react-number-formatter-input"}
                style={inputStyle}
                value={inputValue(props.value as string)}
                onKeyDown={e => ondown(e.key, e)}
                onPaste={e => onpaste(e)}
                onChange={e => updateNumber(e.currentTarget)}
                onCut={e => oncut(e)}
                onClick={e => onclick(e)}
                name={props.name}
            />
        </div>
    );
};
