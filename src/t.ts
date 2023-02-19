export interface NumberFormatterProps {
    value: string | number | undefined;
    getValue: (number: string) => void;
    inputClass?: string;
    format?: string;
    defaultCountry?: string;
    onlyCountries?: string[];
    fixLength?: boolean;
    disabled?: boolean;
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
    onlyCountries: Array<string> | undefined;
    defaultCountry: ICountryList;
    setFormat: (formate: string) => void;
    setCountryCode: (code: string) => void;
};
