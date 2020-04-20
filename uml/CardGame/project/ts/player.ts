import Card from "./card";
import Hand from './hand';
import Score from './score';

export default class Player {
  public hand: Hand;
  public readonly name: string;
  public readonly score: Score;

  constructor(name: string) {
    this.name = name;
    this.hand = new Hand();
    this.score = new Score();
  }
  public addCardInHand(card: Card): void {
    this.hand.addCard(card);
  }
}
