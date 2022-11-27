export const api = async (url: string, params: { [key: string]: string }) => {
    const r = await fetch(url + '?' + new URLSearchParams(params).toString());
    return await r.json();
};