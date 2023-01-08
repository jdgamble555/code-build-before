import { dev } from "$app/environment";

export const settings = {
    sitename: 'Code.Build',
    siteicon: 'code',
    domain: dev ? 'http://localhost:5173' : 'https://code.build',
    meta_title: 'Code.Build 💻',
    meta_description: 'A blog about Databases, Searching, Indexing, Programming, Security, Hosting, and Other Website Technologies!',
    meta_author: 'Jonathan Gamble',
    meta_image: 'https://code.build/assets/code.build.jpg'
};
