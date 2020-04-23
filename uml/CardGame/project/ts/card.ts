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
  constructor(public readonly suit: Suit, public readonly num: number, private direction: Direction) {
  };
  public flip(direction: Direction): void {
    this.direction = direction;
  }
  public toString(): string {
    if (this.direction === Direction.Back) {
      return '* **'
    }
    const suitInitial = this.suit.toString().substring(0, 1).toUpperCase();
    const numStr = (() => {
      switch (this.num) {
        case 1:
          return ' A';
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
          return ' ' + this.num.toString();
        case 10:
          return this.num.toString();
        case 11:
          return ' J';
        case 12:
          return ' Q';
        case 13:
          return ' K';
        default:
          throw new Error('カードの数字が無効です。');
      }
    })();

    return `${suitInitial} ${numStr}`;
  }
}