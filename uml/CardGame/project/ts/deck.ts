import Card from './card'
import { Suit, Direction } from './card'

export default class Deck {
  private cards: Card[];
  constructor() {
    this.cards = [];

    Object.entries(Suit).forEach(([_, suit]) => {
      for (let i = 1; i <= 13; i++){
        this.cards.push(new Card(suit, i, Direction.Back));
      }
    });
  }
  public draw(): Card {
    const card = this.cards.shift();
    if(card){
      return card;
    } else {
      throw new Error('もうカードがありません。')
    }
  }
  public shuffle(): void {
    // カードを切るのを再現してみる
    const cutNum: number = 5;

    const _sh = (cs: Card[], count: number): Card[] => {
      if (count >= cutNum || cs.length <= 1) {
        return cs;
      }

      const cutIndex = Math.floor(Math.random() * (cs.length - 1)) + 1;
      const top = cs.slice(0, cutIndex);
      const bottom = cs.slice(cutIndex);

      return _sh(bottom, count + 1).concat(top);
    };

    for (let i = 0; i < 100; i++){
      this.cards = _sh(this.cards, 0);
    }
  }
}