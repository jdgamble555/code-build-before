import { describe, it, expect, beforeEach } from 'vitest';

import { generateSitemap } from './generate-sitemap.js';

describe('sitemap tests', () => {

    let sitemap: generateSitemap;


    beforeEach(() => {
        sitemap = new generateSitemap();
    });

    it('get blank sitemap', () => {
        const g = sitemap.generate();
        expect(g).toBe(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`);
    });

    it('add image', () => {
        sitemap.addLink({
            loc: 'https://code.build',
            lastmod: new Date(1/1/23).toISOString()
        });
        sitemap.generate();

        console.log(sitemap);
        //expect(g).toBe()
    });

});
