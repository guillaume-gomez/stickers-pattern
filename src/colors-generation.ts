interface LshColor {
  l:number;
  c:number;
  h: number;
}

interface RgbColor {
  r: number;
  g: number;
  b: number;
}

interface HueShiftPaletteOptions {
  base: LshColor,
  minLightness: number;
  maxLightness: number;
  hueStep: number;
  numberOfColor: number;
}


function adjustHue(value: number) : number {
  if (value < 0) value += Math.ceil(-value / 360) * 360;

  return value % 360;
}

function map(n: number, start1:number, end1: number, start2: number, end2: number) : number {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

export function createHueShiftPalette(options: HueShiftPaletteOptions) : LshColor[] {
  const { base, minLightness, maxLightness, hueStep, numberOfColor } = options;

  let palette = [base];

  for (let i = 1; i < Math.floor(numberOfColor-1); i++) {
    const hueDark = adjustHue(base.h - hueStep * i);
    const hueLight = adjustHue(base.h + hueStep * i);
    const lightnessDark = map(i, 0, 4, base.l, minLightness);
    const lightnessLight = map(i, 0, 4, base.l, maxLightness);
    const chroma = base.c;

    palette = [...palette, {
      l: lightnessDark,
      c: chroma,
      h: hueDark,
    }];

    palette = [{
      l: lightnessLight,
      c: chroma,
      h: hueLight,
    }, ...palette];
  }

  return palette;
}
