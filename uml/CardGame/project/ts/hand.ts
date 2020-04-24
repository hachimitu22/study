import Card, { Direction } from "./card";

export default class Hand {
  public readonly cards: Card[];

  constructor() {
    this.cards = [];
  }
  public addCard(card: Card): void {
    this.cards.push(card);
  }
  public releaseAll(): Card[] {
    const cards = [...this.cards];
    while (this.cards.length > 0) this.cards.pop();

    return cards;
  }
  public openAll(): void {
    this.cards.forEach((card: Card) => {
      card.flip(Direction.Front);
    });
  }
  public toString(): string {
    const cards = this.cards.map((card: Card) => `[${card.toString()}]`);
    const line = `{${cards.join(',')}}`;
    return line;
  }
}