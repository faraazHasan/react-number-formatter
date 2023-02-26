export const getDividersPositions = (format: string) => {
    const dividers = [];
    let prefixIndexes: any = [];
    let prefix = "";
    let justSymbols = "";
    for (let i = 0; i < format.length; i++) {
        if (format[i] !== "#") {
            dividers.push({
                index: i,
                symbol: format[i]
            });
            if(!Number(format[i])) {
                justSymbols += format[i];
            }
            if (prefixIndexes.length) {
                if (i - prefixIndexes[prefixIndexes.length - 1] === 1) {
                    prefixIndexes.push(i);
                }
            }
            else {
                prefixIndexes.push(i);
            }
        }
    }
    if (!prefixIndexes.includes(0)) {
        prefixIndexes = [];
    }
    if (prefixIndexes.length) {
        for (let i = 0; i < prefixIndexes.length; i++) {
            prefix += format[i];
        }
    }
    return { dividers, prefixIndexes, prefix, justSymbols };
};

export const getDefaultCountry = (ar: any, defaultCountry?: string, onlyCountries?: string[]):any => {
    let format = {
        c:"",
        f: "",
        n: "",
        d: "",
        c_sm: ""
    };
    if(defaultCountry) {
        ar.forEach((c: any)=> {
            if(c["c"] === defaultCountry?.toUpperCase() || c["n"] === defaultCountry?.toLowerCase() || c["c_sm"] === defaultCountry?.toUpperCase()) {
                format = {
                    c: c["c"],
                    f: c["f"],
                    n: c["n"],
                    d: c["d"],
                    c_sm: c["c_sm"]
                };
            }
        });
    }
    else if(onlyCountries) {
        ar.forEach((c: any)=> {
        if(c["c"] === (onlyCountries as string[])[0].toUpperCase() || c["c_sm"] === (onlyCountries as string[])[0].toUpperCase()) {
            format = {
                c: c["c"],
                f: c["f"],
                n: c["n"],
                d: c["d"],
                c_sm: c["c_sm"]
             };
        }
    });
    }
    if (!format.c) {
        format = {
            c: "IND",
            f: "+91 ####-######",
            n: "India",
            d: "+91",
            c_sm: "IN"
        };
    }
    return format;
};
