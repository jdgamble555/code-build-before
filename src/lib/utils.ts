// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const api = async <T>(url: string, params: Map<string, string>, fetch?: any): Promise<T> => {
    const _url = url + (params.size > 0 ? '?' : '') + new URLSearchParams(Object.entries(params.entries())).toString();
    const r = await fetch(_url);
    return await r.json() as T;
};