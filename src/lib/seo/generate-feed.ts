import { createTag, xmlHeader } from "./xml-utils";

export type Optional<T> = undefined | null | T;

export interface item {
    title: string;
    creator: string;
    published: string;
    link: string;
    description: string;
    category: string | string[];
    id: string;
}

export class generateAtomFeed {

    private feed: string[] = [];
    private pretty: boolean;
    private title: string;
    private description: string;
    private link: string;
    private atomLink: string;
    private language: string;
    private xsl: string;
    private id: string;
    private hostname: string;

    constructor({
        title = '',
        description = '',
        link = '',
        atomLink = '',
        language = '',
        pretty = false,
        xsl = '',
        hostname = '',
        id = ''
    } = {}) {
        this.pretty = pretty;
        this.xsl = xsl;
        this.hostname = hostname + '/';
        this.title = title;
        this.description = description;
        this.link = link;
        this.atomLink = atomLink;
        this.language = language;
        this.id = id;

        this.createHeader();
    }

    private createHeader() {
        this.feed.push(...createTag('title', this.title));
        this.feed.push(...createTag('description', this.description));
        this.feed.push(...createTag('link', this.hostname + this.link));
        this.feed.push(`<atom:link rel="self" type="application/rss+xml" href="${this.atomLink}"/>`);
        this.feed.push(...createTag('language', this.language));
    }

    addItem(tag: item) {

        const data: string[] = [];

        // add title
        const title = createTag('title', tag.title);
        data.push(...title);

        // add creator
        const creator = createTag('dc:creator', tag.creator);
        data.push(...creator);

        // add published date
        const pubdate = createTag('pubDate', tag.published);
        data.push(...pubdate);

        // link
        const link = createTag('link', this.hostname + tag.link);
        data.push(...link);

        // guid
        const guid = createTag('guid', tag.id);
        data.push(...guid);

        // description
        const description = createTag('description', tag.description);
        data.push(...description);

        // categories
        if (tag.category) {

            // force to be array
            const categories = Array.isArray(tag.category)
                ? tag.category
                : [tag.category];

            for (let i = 0; i < categories.length; ++i) {
                const category = createTag('category', categories[i]);
                link.push(...category);
            }
        }

        const item = createTag('item', data);
        this.feed.push(...item);
        return this;
    }

    generate() {
        const attr: Record<string, string> = {};
        attr['xmlns:atom'] = "https://www.w3.org/2005/Atom";
        attr['xmlns:dc'] = "http://purl.org/dc/elements/1.1/";
        attr['version'] = "2.0";
        const channel = createTag('channel', this.feed);
        const rss = createTag('rss', channel, attr);
        const xml = xmlHeader(this.xsl)
        this.feed = [xml].concat(rss);
        return this.feed.join('');
    }
}