import War from './war'
import Keyboard from './keyboard'
import CommandPrompt from './commandprompt'

export default class CardGameManager {
  constructor(private input: Keyboard, private output: CommandPrompt) {
  }
  public run() {
    let game: War;
    while (game = this.selectGame()) {
      game.run();
    }
  }
  private selectGame(): War {
    return new War(this.input, this.output);
  }
}