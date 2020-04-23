import Point from './point';

export interface IInput {
  chooseNumber(min: number, max: number): number;
}
export interface IOutput {
  clearScreen(withBuffer: boolean): void;
  resize(width: number, height: number): void;
  setBufferText(text: string, point: Point): void;
  print(): void;
}