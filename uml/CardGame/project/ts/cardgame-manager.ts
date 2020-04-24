import War from './war'
import Keyboard from './keyboard'
import CommandPrompt from './commandprompt'
import CardGame from './cardgame';
import Blackjack from './blackjack'

export default class CardGameManager {
  constructor(private input: Keyboard, private output: CommandPrompt) {
  }
  public run() {
    let game: CardGame;
    while (game = this.selectGame()) {
      game.run();
      break;
    }
  }
  private selectGame(): CardGame {
    return new Blackjack(this.input, this.output);
  }
}