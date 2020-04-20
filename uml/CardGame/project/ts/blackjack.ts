import CardGame from "./cardgame";

export default class Blackjack extends CardGame {
  public run(): void {
    do {
      this.start();
      this.deal();
      this.turnPlayers();

      if (!this.isBurstAllPlayers()) {
        this.turnDealer();
      }
      this.openHands();
      this.judge();
      this.showResult();
    } while (this.isContinue());
  }
  private start(): void {

  }
  private deal(): void {

  }
  private turnPlayers(): void {

  }
  private turnDealer(): void {

  }
  private isBurstAllPlayers(): boolean {
    return false;
  }
  private openHands(): void {

  }
  private judge(): void {

  }
  protected showResult(): void {

  }
  protected isContinue(): boolean {
    return false;
  }
}