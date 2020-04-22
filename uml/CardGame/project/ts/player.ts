import Card from "./card";
import Hand from './hand';

export default class Player {
  public hand: Hand;
  public readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
  public addCardInHand(card: Card): void {
    this.hand.addCard(card);
  }
}
