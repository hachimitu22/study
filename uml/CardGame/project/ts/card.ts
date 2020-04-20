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
  constructor(private suit: Suit, private num: number, private direction: Direction) {
  };
  public flip(direction: Direction): void {
  }
}