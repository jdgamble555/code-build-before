function createAttributes(attr: Record<string, string>) {
    const s = [];
    for (const i in attr) {
        s.push(`${i}="${attr[i]}"`);
    }

    return s.join(' ');
}

export function createTag(tagName: string, content: string | string[], attr?: Record<string, string>): string[] {
    const openTag = attr ? `${tagName} ${createAttributes(attr)}` : tagName;
    return ([] as string[]).concat(`<${openTag}>`, content, `</${tagName}>`);
}

export function xmlHeader(xsl = '') {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    if (xsl) {
        xml += `<?xml-stylesheet type="text/xsl" href="${xsl}" ?>`;
    }
    return xml;
}

export const encodeXML = (str: string) =>
    str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');