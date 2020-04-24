import CardGame from "./cardgame";
import Player from "./player";
import { IOutput, IInput } from "./io";
import Card, { Direction } from "./card";
import Point from "./point";
import IPlayerStatus from "./playerstatus";
import Hand from "./hand";

class BlackjackPlayerStatus implements IPlayerStatus {
  public isBust: boolean;
  constructor(public sum: number) {
    this.isBust = false;
  }
  public calculationBestScore(hand: Hand): number {
    // http://web.archive.org/web/20070814004138/http://www.ics.kagoshima-u.ac.jp/edu/SoftwareEngineering/blackjack-ood.html
    const frontCards = hand.cards.filter((card: Card) => card.getDirection() === Direction.Front);

    // 1のカードの枚数を数える
    const aceNum: number = frontCards.filter((card: Card) => card.num === 1).length;

    // すべての1を10として計算したときの和
    const preSum = frontCards.reduce((sum: number, card: Card) => {
      if (card.num >= 10) { sum += 10; }
      else if (card.num === 1) { sum += 10; }
      else { sum += card.num; }

      return sum;
    }, 0);

    // 判定
    const bestSum = ((sum: number) => {
      for (let i = 0; i < aceNum; i++){
        if (sum <= 21) break;
        sum -= 9;
      }
      return sum;
    })(preSum);

    this.sum = bestSum;
    this.isBust = this.sum >= 22;

    return this.sum;
  }
  toString(): string {
    return this.sum.toString().padStart(2, ' ');
  }
}

export default class Blackjack extends CardGame {
  private readonly dealer: Player;
  private activeCommandLabels: string[];
  private readonly commandPointX: number;

  constructor(input: IInput, output: IOutput) {
    super(input, output);

    this.dealer = new Player('Dealer', new BlackjackPlayerStatus(0));
    this.players.push(
      new Player('User1', new BlackjackPlayerStatus(0)),
    );

    const width: number = 100;
    const height: number = this.players.length + 2;
    this.output.resize(width, height);

    this.commandList.addCommand('title', () => { this.title(); });
    this.commandList.addCommand('start', () => { this.start(); });
    this.commandList.addCommand('hit', () => { this.drawPlayers();});
    this.commandList.addCommand('stand', () => { this.stand(); });
    this.commandList.addCommand('battle', () => { this.battle(); });
    this.commandList.addCommand('continue', () => { this.continue(); });
    this.commandList.addCommand('end', () => {});

    this.activeCommandLabels = [];
    this.commandPointX = height - 1;
  }
  public run(): void {
    let execCommandLabel: string = 'title';
    do {
      this.output.clearScreen(true);
      this.commandList.execute(execCommandLabel);
      this.setBaseDisplay();
      const nextExecCommandLabel = this.chooseCommand(this.activeCommandLabels);

      if (nextExecCommandLabel === 'end') {
        break;
      }
      execCommandLabel = nextExecCommandLabel;
    } while (true);
  }
  private title(): void {
    this.activeCommandLabels = [
      'start',
      'end',
    ];
  }

  private start(): void {
    this.deck.shuffle();

    // 1st deal
    this.players.forEach((player: Player) => {
      this.deal(player, Direction.Front);
    });
    this.deal(this.dealer, Direction.Front);

    // 2nd deal
    this.players.forEach((player: Player) => {
      this.deal(player, Direction.Front);
    });
    this.deal(this.dealer, Direction.Back);

    this.activeCommandLabels = [
      'hit',
      'stand',
    ];
  }
  private deal(player: Player, direction: Direction): void {
    const card = this.deck.draw();
    card.flip(direction);
    player.hand.addCard(card);

    if (player.status instanceof BlackjackPlayerStatus) {
      player.status.calculationBestScore(player.hand);
    } else {
      throw new Error(`${BlackjackPlayerStatus.name} が使われていません。`);
    }
  }
  private drawPlayers(): void {
    this.players.forEach((player: Player) => {
      this.deal(player, Direction.Front)
    });

    const isAllBust = this.players.every((player: Player) => {
      if (!(player.status instanceof BlackjackPlayerStatus)) {
        throw new Error(`${BlackjackPlayerStatus.name} が使われていません。`);
      }
      return player.status.isBust;
    });

    this.activeCommandLabels = isAllBust ? ['battle'] : ['hit', 'stand'];
  }
  private stand(): void {
    this.activeCommandLabels = ['battle'];
  }
  private drawDealer(): void {
    if (!(this.dealer.status instanceof BlackjackPlayerStatus)) {
      throw new Error(`${BlackjackPlayerStatus.name} が使われていません。`);
    }

    this.dealer.hand.openAll();
    while (this.dealer.status.sum < 17) {
      this.deal(this.dealer, Direction.Front);
    }
  }
  private result(): void {
    if (!(this.dealer.status instanceof BlackjackPlayerStatus)) {
      throw new Error(`${BlackjackPlayerStatus.name} が使われていません。`);
    }

    const dStatus: BlackjackPlayerStatus = this.dealer.status;

    this.players.forEach((player: Player, i: number) => {
      const winLose: string = (() => {
        if (!(player.status instanceof BlackjackPlayerStatus)) {
          throw new Error(`${BlackjackPlayerStatus.name} が使われていません。`);
        }

        if ((player.status.isBust && dStatus.isBust) || player.status.sum === dStatus.sum) return 'Draw';
        if (!player.status.isBust) {
          if (!dStatus.isBust) {
            return player.status.sum > dStatus.sum ? 'Win' : 'Lose';
          } else {
            return 'Win';
          }
        } else {
          return 'Lose';
        }
      })();

      this.output.setBufferText(winLose, new Point(0, i + 1));
    });
  }
  private battle(): void {
    this.drawDealer();
    this.result();

    this.activeCommandLabels = [
      'continue',
      'end',
    ];
  }
  private continue(): void {
    this.players.forEach((player: Player) => {
      this.deck.addCards(player.hand.releaseAll());
    });
    this.deck.addCards(this.dealer.hand.releaseAll());

    this.start();

    this.activeCommandLabels = [
      'hit',
      'stand',
    ];
  }
  private setBaseDisplay(): void {
    const ps: Player[] = [this.dealer].concat(this.players);
    ps.forEach((p: Player, i: number) => {
      this.output.setBufferText(p.toString(), new Point(10, i));
    });
  }
  private chooseCommand(activeCommandLabels: string[]): string {
    const cl = this.commandList.choice(activeCommandLabels);
    this.output.setBufferText(cl.toString(), new Point(0, this.commandPointX));
    this.output.clearScreen(false);
    this.output.print();

    const index: number = this.input.chooseNumber(0, cl.size() - 1);

    return activeCommandLabels[index];
  }
}