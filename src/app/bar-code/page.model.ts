export class Page {
  type!: string;
  width!: number;
  height!: number;

  constructor(type: string, width: number, height: number) {
    this.type = type;
    this.width = width;
    this.height = height;
  }
}

export class Dimension {
  type!: string;
}
