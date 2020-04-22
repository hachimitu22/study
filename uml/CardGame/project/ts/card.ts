export enum Suit {
  Spade = 'Spade',
  Heart = 'Heart',
  Diamond = 'Diamond',
  Club = 'Club',
};
export enum Direction {
  Front = 'Front',
  Back = 'Back',
};

export default class Card {
  constructor(public readonly suit: Suit, public readonly num: number, public readonly direction: Direction) {
  };
  public flip(direction: Direction): void {
  }
}