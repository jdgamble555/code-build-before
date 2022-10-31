import { dev } from "$app/environment";

export const settings = {
    sitename: 'Code.Build',
    siteicon: 'code',
    domain: dev ? 'http://localhost:5173' : 'https://code.build/'
};