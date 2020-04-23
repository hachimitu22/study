import CardGame from './cardgame'
import { IInput, IOutput } from './io';
import Player from './player';
import Point from './point';
import WarHand from './warhand'
import Card from './card';

export default class War extends CardGame {
  private activeCommandLabels: string[];
  private readonly dumpCards: Card[];

  constructor(input: IInput, output: IOutput) {
    super(input, output);

    this.players.push(new Player('User1', new WarHand()));
    this.players.push(new Player('Cpu1', new WarHand()));
 
    this.output.resize(40, this.players.length + 1);

    this.commandList.addCommand('start', () => { this.start(); });
    this.commandList.addCommand('open', () => { this.open();});
    this.commandList.addCommand('continue', () => { this.continue();});
    this.commandList.addCommand('end', () => {});

    this.activeCommandLabels = [];
    this.dumpCards = [];
  }
  public run(): void {
    this.title();
    do {
      const execCommandLabel = this.chooseCommand(this.activeCommandLabels);
      this.commandList.execute(execCommandLabel);

      if (execCommandLabel === 'end') {
        break;
      }
    } while (true);
  }
  private title(): void {
    this.deck.shuffle();
    this.setBaseDisplay();
    this.output.print();

    this.activeCommandLabels = [
      'start',
      'end',
    ];
  }
  private start(): void {
    this.deal();
    this.setBaseDisplay();
    this.output.print();

    this.activeCommandLabels = [
      'open',
    ];
  }
  private deal(): void {
    this.players.forEach(player => {
      const card = this.deck.draw();
      player.hand.addCard(card);
    });
  }
  private open(): void {
    this.players.forEach(player => {
      player.hand.openAll();
    });
    this.setBaseDisplay();
    this.showResult();
    this.output.print();

    this.activeCommandLabels = [
      'continue',
      'end',
    ];
  }
  private showResult(): void {
    const nums = this.players.map(p => p.hand.getRank());
    const maxNum = Math.max(...nums);

    nums.forEach((n, i) => {
      const text = n === maxNum ? 'WIN' : 'LOSE';
      this.output.setBufferText(text, new Point(20, i));
    });
  }
  private continue(): void {
    this.players.forEach(p => {
      if (p.hand instanceof WarHand) {
        this.dumpCards.push(...p.hand.dumpCards());
      }
    });

    if (this.players.length > this.deck.rest()) {
      this.deck.addCards(this.dumpCards);
      while (this.dumpCards.length > 0) this.dumpCards.pop();
      this.deck.shuffle();
    }

    this.start();
  }
  private setBaseDisplay(): void {
    this.output.clearScreen(true);
    this.players.forEach((p: Player, i: number) => {
      this.output.setBufferText(p.toString(), new Point(0, i));
    });
  }
  private chooseCommand(activeCommandLabels: string[]): string {
    const cl = this.commandList.choice(activeCommandLabels);
    console.log(cl.toString());
    // this.output.printText(cl.show(), new Point(0, this.players.length), false);
    const index: number = this.input.chooseNumber(0, cl.size() - 1);

    return activeCommandLabels[index];
  }
}