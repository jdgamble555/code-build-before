export function tagsRequired() {
    return (value: string) => ({ valid: value.length > 0, name: 'required' });
}

export function tagsMin(n: number) {
    return (value: string) => ({ valid: value.length >= n, name: 'min' });
}