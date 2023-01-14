import { createTag, xmlHeader } from "./xml-utils";

export type changeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
export type priority = 0.0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0;

export type Optional<T> = undefined | null | T;

// https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap
// todo - add pretty print
// todo - add news
// todo - add videos
// todo = add streaming

// https://www.sitemaps.org/protocol.html

export interface sitemapTag {
    loc: string;
    lastmod?: Optional<string>;
    changefreq?: Optional<changeFreq>;
    priority?: Optional<priority>;
    image?: Optional<string[] | string>;
};

export class generateSitemap {

    private feed: string[] = [];
    private pretty: boolean;
    private useImage: boolean;
    private xsl: string;
    private hostname: string;

    constructor({
        useImage = false,
        pretty = false,
        xsl = '',
        hostname = ''
    } = {}) {
        this.pretty = pretty;
        this.useImage = useImage;
        this.xsl = xsl;
        this.hostname = hostname + '/';
    }

    addLink(tag: sitemapTag) {

        const link: string[] = [];

        // add loc
        const loc = createTag('loc', this.hostname + tag.loc);
        link.push(...loc);

        // lastmod
        if (tag.lastmod) {
            const lastmod = createTag('lastmod', tag.lastmod);
            link.push(...lastmod);
        }

        // images
        if (tag.image) {
            // force to be array
            const images = Array.isArray(tag.image)
                ? tag.image
                : [tag.image];

            // add image namespace
            this.useImage = true;

            for (let i = 0; i < images.length; ++i) {
                const image_loc = createTag('image:loc', images[i]);
                const image_image = createTag('image:image', image_loc);
                link.push(...image_image);
            }
        }

        // changefreq
        if (tag.changefreq) {
            const changefreq = createTag('changefreq', tag.changefreq);
            link.push(...changefreq);
        }

        // priority
        if (tag.priority) {
            // todo - check for leading zeros
            const priority = createTag('priority', tag.priority.toString());
            link.push(...priority);
        }

        // create url
        const url = createTag('url', link);
        this.feed.push(...url);
        return this;
    }

    generate() {
        const attr: Record<string, string> = {};
        attr['xmlns'] = "http://www.sitemaps.org/schemas/sitemap/0.9";
        if (this.useImage) {
            attr['xmlns:image'] = 'http://www.google.com/schemas/sitemap-image/1.1';
        }
        const urlset = createTag('urlset', this.feed, attr);
        const xml = xmlHeader(this.xsl)
        this.feed = [xml].concat(urlset);
        return this.feed.join('');
    }
}