import Hand from './hand';
import IPlayerStatus from './playerstatus';

export default class Player {
  public readonly hand: Hand;

  constructor(public readonly name: string, public status: IPlayerStatus) {
    this.hand = new Hand();
  }
  public changeParam(param: IPlayerStatus) {
    this.status = param;
  }
  public toString(): string {
    const name = this.name.padEnd(10, ' ');
    const handStr = this.hand.toString();
    const line = `${name}:${handStr}`;
    return line;
  }
}
