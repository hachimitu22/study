import { IOutput } from './io'
import Point from './point';

export default class CommandPrompt implements IOutput {
  private readonly buffer: string[];
  constructor(private width: number, private height: number) {

    this.buffer = [];
    for (let y = 0; y < this.height; y++){
      this.buffer[y] = '';
    }
  }
  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;

    for (let y = 0; y < this.height; y++){
      if(this.buffer[y]) this.buffer[y] = '';
    }
  }
  clearScreen(withBuffer: boolean): void {
    console.clear();

    if (withBuffer) {
      for (let y = 0; y < this.height; y++){
        this.buffer[y] = '';
      }
    }
  }
  setBufferText(text: string, point: Point): void {
    const oldLine = this.buffer[point.y] || '';
    const top = oldLine.length >= point.x ? oldLine.slice(0, point.x) : oldLine + ' '.repeat(point.x - oldLine.length);
    const tail = oldLine.length > point.x + text.length ? oldLine.slice(point.x + text.length) : '';
    const newLine = top + text + tail;
    this.buffer[point.y] = newLine;
  }
  print(): void {
    for (let y = 0; y < this.height; y++){
      const text = this.buffer[y].slice(0, this.width);
        console.log(text);
    }
  }
}