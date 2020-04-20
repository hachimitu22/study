import Player from './player'
import Deck from './deck'
import {IInput, IOutput} from './io'

export default abstract class CardGame {
  protected input: IInput;
  protected output: IOutput;
  protected players: Player[];
  protected deck: Deck;

  constructor(input: IInput, output: IInput) {
    this.players = [];
    this.deck = new Deck();
    this.input = input;
    this.output = output;
  }
  public abstract run(): void;
  protected abstract isContinue(): boolean;
  protected abstract showResult(): void;
}