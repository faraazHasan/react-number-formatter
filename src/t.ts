export interface NumberFormatterProps {
    value: string | number | undefined;
    getValue: (number: string) => void;
    inputClass?: string;
    selectorClass?: string;
    format?: string;
    defaultCountry?: string;
    onlyCountries?: string[];
    fixLength?: boolean;
    disabled?: boolean;
    menuClass?:string;
    getCountryCode?: (code: string) => void;
};

export interface ICountryList {
    n: string;
    c: string;
    d: string;
    f: string;
};

export interface ICasheKeywords {
    [index: string]: string;
};

export interface ISelector {
    disabled: boolean | undefined;
    selectorClass: string | undefined;
    onlyCountries: Array<string> | undefined;
    defaultCountry: ICountryList;
    setFormat: (formate: string) => void;
    menuClass: string | undefined;
    setCountryCode: (code: string) => void;
};
