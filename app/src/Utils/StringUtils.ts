
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    // padStart in not yet availbale everywhere,
    // in production I would use a polyfill or an alternative
    const day = date.getDay().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    // is the hour/minute relevant in this case?
    return `${day}-${month}-${year}`;
};

export const camelCasify = (str: string): string => {
    return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
};