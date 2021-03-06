interface IFilters {
  blur: number;
  brightness: number;
  contrast: number;
  saturation: number;
}

export function percentual(number = 0) {
  return number / 100;
}

export function normalize(number = 0) {
  return 1 + percentual(number);
}

export function makeFilter(filters: IFilters) {
  const blur = filters.blur;
  const brightness = normalize(filters.brightness);
  const contrast = normalize(filters.contrast);
  const saturation = filters.saturation;
  return `brightness(${brightness}) contrast(${contrast}) blur(${blur}px) saturate(${saturation}%)`;
}

export function randomString() {
  return (Math.random() + 1).toString(16).substring(2);
}

export async function copyToClipboard(data: ClipboardItem) {
  return await navigator.clipboard.write([data]);
}
export async function blobToClipboard(blob: Blob) {
  const clipboardItem = new ClipboardItem({ 'image/png': blob });
  return await copyToClipboard(clipboardItem);
}

export function readFile(file: File) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => resolve(reader.result as string),
      false
    );
    reader.readAsDataURL(file);
  });
}

export function createFile(content: Blob, filename: string) {
  return new File([content], filename, {
    lastModified: new Date().getTime(),
    type: 'image/png',
  });
}

export const createImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', '*'); // needed to avoid cross-origin issues
    image.src = url;
  });

export async function getImageDimensions(dataURI: string) {
  return new Promise<{ width: number; height: number }>((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    img.src = dataURI;
  });
}

async function canvasFromImage(
  imgElement: HTMLImageElement | null,
  filters: IFilters
) {
  if (!imgElement) return;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  const image = await createImage(imgElement.src);
  const { width, height } = await getImageDimensions(imgElement.src);

  canvas.width = width;
  canvas.height = height;

  const rescaledBlur = Math.floor((filters.blur * width) / imgElement.width);

  const canvasFilter = makeFilter({ ...filters, blur: rescaledBlur });

  ctx.filter = canvasFilter;
  ctx.drawImage(image, 0, 0);

  return canvas;
}

export async function getDownloadableDataURI(
  imgElement: HTMLImageElement | null,
  filters: IFilters
): Promise<string | undefined> {
  const canvas = (await canvasFromImage(
    imgElement,
    filters
  )) as HTMLCanvasElement;

  return canvas.toDataURL('image/png');
}

export async function getDownloadableBlob(
  imgElement: HTMLImageElement | null,
  filters: IFilters
): Promise<Blob> {
  const canvas = (await canvasFromImage(
    imgElement,
    filters
  )) as HTMLCanvasElement;

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob as Blob);
    }, 'image/png');
  });
}

export async function blobFromDataURI(dataURI?: string) {
  if (!dataURI) return;
  const res = await fetch(dataURI);
  return await res.blob();
}
