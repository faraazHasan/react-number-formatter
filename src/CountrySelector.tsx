import React from "react"; 
import { useEffect, useRef, useState } from "react";
import { ICountryList, ISelector } from "./t";
import {c} from "./c";
import Arrow from './Arrow';

export const CountrySelector: React.FC<ISelector> = (props: ISelector) => {
    const selector = useRef<HTMLDivElement>();
    const [imgErr, setImgErr] = useState(true);
    const [selectedOption, setSelectedOption] = useState<string>();
    const activeOption = useRef<number | undefined>();
    const shouldShowDrpDwn = useRef<boolean>(true);
    const drpBtn = useRef<HTMLButtonElement>();
    const selectorInput = useRef<HTMLInputElement>();
    const [search, setSearch] = useState("");
    const noOptions = useRef(false);

    useEffect(()=> { 
        const img = new Image()
        img.onload = () => {
          setSelectedOption((props.flags === undefined || props.flags) ? props.defaultCountry.fg : props.fullIsoCode ? props.defaultCountry.c : props.defaultCountry.c_sm)
          setImgErr(false);
        }
        img.onerror = () => {
          setSelectedOption(props.fullIsoCode ? props.defaultCountry.c : props.defaultCountry.c_sm)
          setImgErr(true)
        }
        img.src = c[0].fg
      },[]) 
    useEffect(()=> {
        window.onclick = function(event: MouseEvent | TouchEvent) {
            if ((event.target && (event.target as HTMLButtonElement).className !== "react-number-formatter-dropbtn") 
            && (event.target && (event.target as HTMLButtonElement).className !== "react-number-formatter-dropdown-input")) {
                selector.current && selector.current.classList.remove("show");
            }
        };
        window.ontouchstart = function(event: TouchEvent) {
            if ((event.target && (event.target as HTMLDivElement).className !== "react-number-formatter-option") 
            && (event.target && (event.target as HTMLButtonElement).className !== "react-number-formatter-dropbtn") 
            && (event.target && (event.target as HTMLButtonElement).className !== "react-number-formatter-dropdown-input") 
            && (event.target as HTMLDivElement).className !== "react-number-formatter-option-no-search") {
                selector.current && selector.current.classList.remove("show");
            }
        };
    },[]);
    
    const getSelector = () => {
        if(drpBtn.current) {
            const offset = drpBtn.current.getBoundingClientRect();
            if(offset.bottom > 500) {
                selector.current && shouldShowDrpDwn.current && selector.current.classList.add("react-number-formatter-dropdown-content-top");
            }
            else {
                selector.current && shouldShowDrpDwn.current && selector.current.classList.remove("react-number-formatter-dropdown-content-top");
            }
        } 
        selector.current && shouldShowDrpDwn.current && selector.current.classList.toggle("show");
    };
    const menuStyle = props.onlyCountries ? props.onlyCountries.length < 5 ? {
        height: "auto"
    } : {} : {};

    const selectOption = (country: ICountryList, index: number) => {
        changeCountry(country['f'], country['d'], country['p'])
        setSelectedOption(((props.flags === undefined || props.flags) && !imgErr) ? country['fg'] : props.fullIsoCode ? country['c'] : country['c_sm'])
        activeOption.current = index
      }

    const countrySelectorStyle = {borderRadius:"4px 0px 0px 4px"};

    const changeCountry = async (format: string, code: string, placeholder: string)=> {
        props.setFormat({
            format,
            placeholder,
          }) 
        props.mainInput?.focus()
        props.setCountryCode(code);
    };
    
    const countryOptions = (ar: ICountryList[]): ICountryList[] => {
      const options =  props.onlyCountries ? ar.filter((country: ICountryList) => {
            const name = country["n"].toLocaleLowerCase();
            if(search) {
                return (props.onlyCountries?.includes(country["c"]) || props.onlyCountries?.includes(country["c_sm"])) && name.startsWith(search);
            }
            else {
                return (props.onlyCountries?.includes(country["c"]) || props.onlyCountries?.includes(country["c_sm"]));
            };
           })
           :
           ar.filter((country: ICountryList)=> {
            const name = country["n"].toLocaleLowerCase()
            if(search) {
                return name.startsWith(search);
            }
            else {
                return country
            };
           });
        shouldShowDrpDwn.current = (options.length && options.length > 1) || search ? true : false;
        if(!shouldShowDrpDwn.current || props.disabled) {
            drpBtn.current && drpBtn.current.classList.add("react-number-formatter-dropbtn-false");
        }
        noOptions.current = options.length ? false : true;
        return options;
    };
    
  return (
    <div className="react-number-formatter-dropdown-parent">
        <button
            disabled={props.disabled}
            ref={(ref: HTMLButtonElement) => drpBtn.current = ref}
            className={"react-number-formatter-dropbtn"}
            style={countrySelectorStyle}
            onClick={getSelector}
            type="button"
            >
            <div className="react-number-formatter-dropbtn-text">
            {
            ((props.flags === undefined || props.flags) && !imgErr) ?
            <img src={selectedOption} className={"react-number-formatter-selected-flag zoom"} alt={selectedOption} />
            : 
            <span>{selectedOption}</span>
          }
          {(props.onlyCountries &&
            props.onlyCountries.length < 2 &&
            (props.onlyCountries[0] === props.defaultCountry.c_sm ||
              props.onlyCountries[0] === props.defaultCountry.c)) ||
          props.disabled ? (
            ''
          ) :
            <div className={"react-number-formatter-arrow-parent"}>
                <Arrow color={'rgb(108, 108, 108)'} />
            </div>
            }
            </div>
        </button>
        <div 
            style={menuStyle}
            ref={(ref: HTMLDivElement)=> selector.current = ref}
            className={"react-number-formatter-dropdown-content"}
        >  
           {
            (props.searchOption === undefined || props.searchOption) &&
            <div className="react-number-formatter-dropdown-input-parent">
                <input 
                    type="search"
                    placeholder="Search..." 
                    ref={(ref: HTMLInputElement) => selectorInput.current = ref} 
                    className={"react-number-formatter-dropdown-input"} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                        setSearch(e.currentTarget.value.toLocaleLowerCase());
                    }}
                />
            </div>
           }
           <div className={"react-number-formatter-dropdown-content-child"}>
            <div>
            {
                countryOptions(c).map((country: ICountryList, index: number)=> {
                    return (
                    <button 
                        key={index} 
                        onClick={()=> {
                            selectOption(country, index);
                        }} 
                        className={"react-number-formatter-option"}
                        type="button"
                        >
                        {((props.flags === undefined || props.flags) && !imgErr) ? <img src={country['fg']} alt="" className={"react-number-formatter-flag"} /> : ""} {country['n']} {country['d']}
                    </button>
                    )
                })
            }
            {
                noOptions.current && 
                <p className="react-number-formatter-no-option">
                    No options
                </p>
            }
            </div>
           </div>
        </div>
        
    </div>
  );
};

