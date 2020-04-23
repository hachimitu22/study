import Card from "./card";

export default interface IHand {
  readonly cards: Card[];

  addCard(card: Card): void;
  openAll(): void;
  getRank(): number;
  calculationRank(): void;
  toString(): string;
}