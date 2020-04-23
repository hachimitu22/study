import Player from './player'
import Deck from './deck'
import CommandList from './commandlist'
import {IInput, IOutput} from './io'

export default abstract class CardGame {
  protected readonly input: IInput;
  protected readonly output: IOutput;
  protected readonly players: Player[];
  protected readonly deck: Deck;
  protected readonly commandList: CommandList;

  constructor(input: IInput, output: IOutput) {
    this.players = [];
    this.deck = new Deck();
    this.commandList = new CommandList();
    this.input = input;
    this.output = output;
  }
  public abstract run(): void;
}