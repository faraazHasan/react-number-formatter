export interface NumberFormatterProps {
    value: string;
    getValue: (number: string) => void;
    format?: string;
    defaultCountry?: string;
    onlyCountries?: string[];
    fixLength?: boolean;
    disabled?: boolean;
    searchOption?: boolean;
    fullIsoCode?: boolean;
    getCountryCode?: (code: string) => void;
    name?: string;
    register?: any;
};

export interface ICountryList {
    n: string;
    c: string;
    d: string;
    f: string;
    c_sm: string;
};

export interface ICasheKeywords {
    [index: string]: string;
};

export interface ISelector {
    disabled: boolean | undefined;
    onlyCountries: Array<string> | undefined;
    defaultCountry: ICountryList;
    searchOption?: boolean;
    fullIsoCode?: boolean;
    setFormat: (formate: string) => void;
    setCountryCode: (code: string) => void;
};
