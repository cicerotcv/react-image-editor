import DomToImage from 'dom-to-image';

export function percentual(number = 0) {
  return number / 100;
}

export function normalize(number = 0) {
  return 1 + percentual(number);
}

export function randomString() {
  return (Math.random() + 1).toString(16).substring(2);
}

export async function copyToClipboard(data: ClipboardItem) {
  return await navigator.clipboard.write([data]);
}

export async function domToBlob(node: Node | null) {
  if (!node) return;
  return await DomToImage.toBlob(node);
}

export async function domToDataUrl(node: Node | null) {
  if (!node) return;
  return await DomToImage.toPng(node);
}
