import Hand from "./hand";
import Card, { Direction } from "./card";

export default class WarHand implements Hand {
  public readonly cards: Card[];
  private rank: number;

  constructor() {
    this.cards = [];
    this.rank = 0;
  }

  releaseAll(): Card[] {
    const cards = [...this.cards];
    while (this.cards.length > 0) this.cards.pop();

    return cards;
  }
  addCard(card: Card): void {
    if (this.cards.length === 0) {
      this.cards.push(card);
      this.calculationRank();
    } else {
      throw new Error('一旦カードを全部捨ててください');
    }
  }
  openAll(): void {
    this.cards.forEach((card: Card) => {
      card.flip(Direction.Front);
    });
  }
  getRank(): number {
    return this.rank;
  }
  calculationRank(): void {
    this.rank = this.cards[0].num;
  }
  toString(): string {
    const cards = this.cards.map((card: Card) => `[${card.toString()}]`);
    const line = `{${cards.join(',')}}`;
    return line;
  }
}