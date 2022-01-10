
export function utf8_to_b64(str) {
    if (typeof str === 'string') return window.btoa(unescape(encodeURIComponent(str)));
    else return null;
}

export function b64_to_utf8(str) {
    if (typeof str === 'string') return decodeURIComponent(escape(window.atob(str)));
    else return null;
}
