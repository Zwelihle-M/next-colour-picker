/* eslint-disable @typescript-eslint/no-explicit-any */
import { extractColors } from 'extract-colors';
import getPixels from 'get-pixels';

interface ExtractorOptions {
  pixels?: number;
  distance?: number;
  colorValidator?: (red: number, green: number, blue: number, alpha?: number) => boolean;
  saturationDistance?: number;
  lightnessDistance?: number;
  hueDistance?: number;
}

export async function extractColorsFromImage(src: string, options?: ExtractorOptions): Promise<any> {
  // Check if running on the client-side (browser)
  if (typeof window !== "undefined") {
    return extractColors(src, options)
      .then((colors: any[]) => colors)
      .catch((error: any) => {
        throw new Error(`Error extracting colors: ${error}`);
      });
  }

  // Running on the server-side (Node.js)
  return new Promise((resolve, reject) => {
    getPixels(src, (err: Error | null, pixels: any) => {
      if (err) {
        reject(new Error(`Error getting pixels: ${err}`));
      } else {
        const data = [...pixels.data];
        const width = Math.round(Math.sqrt(data.length / 4));
        const height = width;

        extractColors({ data, width, height, ...options })
          .then((colors: any[]) => resolve(colors))
          .catch((extractionError: any) =>
            reject(new Error(`Extraction error: ${extractionError}`))
          );
      }
    });
  });
}
