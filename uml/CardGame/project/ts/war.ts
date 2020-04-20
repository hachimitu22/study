import CardGame from './cardgame'

export default class War extends CardGame {
  public run(): void {
    do {
      this.start();
      this.deal();
      this.open();
      this.judge();
      this.showResult();
    } while (this.isContinue());
  }
  private start(): void {

  }
  private deal(): void {
    this.players.forEach(player => {
      const card = this.deck.draw();
      player.hand.addCard(card);
    });
  }
  private open(): void {
    this.players.forEach(player => {
      player.hand.show();
    });
  }
  private judge(): void {

  }
  protected showResult(): void {

  }
  protected isContinue(): boolean {
    return false;
  }
}