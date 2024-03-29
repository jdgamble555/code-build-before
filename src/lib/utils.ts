/* eslint-disable @typescript-eslint/no-explicit-any */
type Optional<T> = T | undefined | null;

export const api = async <T>(url: string, params: Map<string, string>, fetch?: any): Promise<T> => {
    const _url = url + (params.size > 0 ? '?' : '') + new URLSearchParams(Object.entries(params.entries())).toString();
    const r = await fetch(_url);
    return await r.json() as T;
};

export function slugify(value: string): string {
    return value
        .split('-').join(' ')
        .normalize('NFD') // split an accented letter in the base letter and the accent
        .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
        .replace(/\s+/g, '-') // separator
}

export function minutesToRead(data: string): string {
    const wordCount = data.trim().split(/\s+/g).length;
    return (wordCount / 100 + 1).toFixed(0);
}

export function isValidURL(url: Optional<string>): boolean {
    let _url;
    if (!url) {
        return false;
    }
    try {
        _url = new URL(url);
    } catch (_) {
        return false;
    }
    return _url.protocol === "http:" || _url.protocol === "https:";
}

export const capitalizeFirstLetter = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
