import Hand from './hand';

export default class Player {
  public readonly name: string;
  public readonly hand: Hand;

  constructor(name: string, hand: Hand) {
    this.name = name;
    this.hand = hand;
  }
  public toString(): string {
    const name = this.name.padEnd(10, ' ');
    const handStr = this.hand.toString();
    const line = `${name}:${handStr}`;
    return line;
  }
}
