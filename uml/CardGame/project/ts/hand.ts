import Card from "./card";
import { Direction } from './card'

export default class Hand {
  private cards: Card[];

  constructor() {
    this.cards = [];
  }
  public addCard(card: Card): void {
    this.cards.push(card);
  }
  public show(): void {
    this.cards.forEach(card => {
      card.flip(Direction.Front);
    });
  }
}