import Card from "./card";
import { Direction } from './card'

export default class Hand {
  private cards: Card[];
  private rank: number;

  constructor() {
    this.cards = [];
    this.rank = 0;
  }
  public addCard(card: Card): void {
    this.cards.push(card);
  }
  public show(): void {
    this.cards.forEach(card => {
      card.flip(Direction.Front);
    });
  }
  public getRank(): number {
    return this.rank;
  }
}