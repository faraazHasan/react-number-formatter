import { useEffect, useRef, useState } from "react";
import { ICountryList, ISelector } from "./t";
import {c} from "./c";
import React from "react";

export const CountrySelector: React.FC<ISelector> = (props: ISelector) => {
    const selector = useRef<HTMLDivElement>();
    const [selectedOption, setSelectedOption] = useState<string>(props.defaultCountry.c);
    const activeOption = useRef<number | undefined>();
    const shouldShowDrpDwn = useRef<boolean>(true);
    const drpBtn = useRef<HTMLButtonElement>();

    useEffect(()=> {
        window.onclick = function(event: MouseEvent | TouchEvent) {
            if (event.target && (event.target as HTMLButtonElement).className !== "react-number-formatter-dropbtn") {
            selector.current && selector.current.classList.remove("show");
            }
        };
        window.ontouchstart = function(event: TouchEvent) {
            if ((event.target && (event.target as HTMLDivElement).className !== "react-number-formatter-option") && event.target && (event.target as HTMLButtonElement).className !== "react-number-formatter-dropbtn") {
            selector.current && selector.current.classList.remove("show");
            }
        };
    },[]);
    
    const getSelector = () => {
        selector.current && shouldShowDrpDwn.current && selector.current.classList.toggle("show");
    };
    const menuStyle = props.onlyCountries ? props.onlyCountries.length < 5 ? {
        height: "auto"
    } : {} : {};
    const defaultOptionStyle = activeOption.current === undefined ? {backgroundColor: "rgb(224, 222, 222)"} : {};
    const optionStyle = (index: number) => {
        return activeOption.current === index ? {backgroundColor: "rgb(224, 222, 222)"} : {};
    };
    const selectDefaultOption = () => {
        changeCountry(props.defaultCountry.f, props.defaultCountry.d);
        setSelectedOption(props.defaultCountry.c);
        activeOption.current = undefined;
    };

    const selectOption = (country: ICountryList, index: number) => {
        changeCountry(country["f"], country["d"]);
        setSelectedOption(country["c"]);
        activeOption.current = index;
    };

    const countrySelectorStyle = {borderRadius:"4px 0px 0px 4px"};

    const changeCountry = async (format: string, code: string)=> {
        props.setFormat(format);
        props.setCountryCode(code);
    };
    
    const countryOptions = (ar: ICountryList[], ): ICountryList[] => {
      const options =  props.onlyCountries ? ar.filter((country)=> {
            return country["c"] !== props.defaultCountry.c || !props.onlyCountries?.includes(country["c"]);
           }).filter((country: ICountryList) => {
            return props.onlyCountries?.includes(country["c"]) ? country["c"] !== props.defaultCountry.c : null;
           })
           :
           ar.filter((country: ICountryList)=> {
            return country["c"] !== props.defaultCountry.c;
           });
        shouldShowDrpDwn.current = options.length ? true : false;
        if(!shouldShowDrpDwn.current || props.disabled) {
            drpBtn.current && drpBtn.current.classList.remove("react-number-formatter-dropbtn");
            drpBtn.current && drpBtn.current.classList.add("react-number-formatter-dropbtn-false");
        }
        return options;
    };
    
  return (
    <div className="react-number-formatter-dropdown-parent">
        <button
            disabled={props.disabled}
            className={"react-number-formatter-dropbtn"}
            style={countrySelectorStyle}
            onClick={getSelector}
            ref={(ref: HTMLButtonElement) => drpBtn.current = ref}
            >
            <div className="react-number-formatter-dropbtn-text">
            <span>{selectedOption}</span> {(!shouldShowDrpDwn.current && props.disabled) ? "" : <span className="react-number-formatter-arrow">&#x25BE;</span>}
            </div>
        </button>
        <div 
            style={menuStyle}
            ref={(ref: HTMLDivElement)=> selector.current = ref} 
            className={"react-number-formatter-dropdown-content"}
        >
            <button  
                style={defaultOptionStyle}
                onClick={selectDefaultOption} 
                className="react-number-formatter-option" 
                >
                {props.defaultCountry.n} {props.defaultCountry.d}
            </button>
            {countryOptions(c).map((country: ICountryList, index: number)=> {
            return (
            <button 
            key={index} 
            onClick={()=> {
                selectOption(country, index);
            }} 
            style={optionStyle(index)}
            className="react-number-formatter-option">{country["n"]} {country["d"]}</button>
            );
            })}
        </div>
    </div>
  );
};

