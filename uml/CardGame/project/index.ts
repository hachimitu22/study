import * as readline from 'readline'

class War {
  private player: Player;
  private cpuPlayer: CpuPlayer;
  private stack: Stack;

  constructor() {
    this.player = new Player();
    this.cpuPlayer = new CpuPlayer();
    this.stack = new Stack();
  }
  public Run(): void {
    const rl = readline.createInterface(process.stdin, process.stdout);

    (async () => {
      console.log('ゲームを開始するには何かキーを押してください');
      await new Promise(res => rl.once('line', res));
      this.GameStart();

      console.log('カードを引くには何かキーを押してください');
      await new Promise(res => rl.once('line', res));
      this.DrawPlayer();

      console.log('CPUがカードを引きます、何かキーを押してください');
      await new Promise(res => rl.once('line', res));
      this.DrawCPU();

      console.log('CPUがカードを引きました、お互いの手札を見せあいます。何かキーを押してください');
      await new Promise(res => rl.once('line', res));
      this.AnnounceResult();

      console.log('ゲームを終了します。何かキーを押してください');
      await new Promise(res => rl.once('line', res));
      this.GameEnd();

      process.exit();
    })();
  }
  private GameStart(): void {
    this.stack.shuffle();
    console.log('カードをシャッフルして山札を用意しました');
  }
  private DrawPlayer(): void {
    this.player.drawCard(this.stack);
    console.log(`カードを引きました、数は ${this.player.takeCardReference().num} です`);
  }
  private DrawCPU(): void {
    this.cpuPlayer.drawCard(this.stack);
  }
  private AnnounceResult(): void{
    const pn: Number = this.player.takeCardReference().num;
    const cn: Number = this.cpuPlayer.takeCardReference().num;
    const [ps, cs]: [string, string] = pn > cn ? ['勝ち', '負け']
                                      : pn < cn ? ['負け', '勝ち']
                                      : ['引き分け', '引き分け'];

    console.log(`${ps} プレイヤー ${pn} CPU ${cn} ${cs}`);
  }
  private GameEnd(): void{

  }
}

abstract class BasePlayer {
  private card: Card | null;

  constructor() {
    this.card = null;
  }
  public drawCard(stack: Stack): void {
    this.card = stack.take();
  }
  public takeCardReference(): Card {
    if(this.card) {
      return this.card;
    } else {
      throw new Error('カードを持っていません。');
    }
  }
}

class Player extends BasePlayer {
}
class CpuPlayer extends BasePlayer {
}

class Card {
  constructor(public readonly suit: String, public readonly num: Number){}
}

class Stack {
  private cards: Card[];

  constructor() {
    const suits: string[] = ['spade', 'heart', 'diamond', 'club'];

    this.cards = [];

    for(let i = 0; i < 13; i++) {
      const num: Number = i + 1;
      suits.forEach((suit: string) => {
        const card = new Card(suit, num);
        this.cards.push(card);
      });
    }
  }
  public shuffle(): void {
    // カードを切るのを再現してみる
    for(let i = 0; i < 100; i++){
      const cutIndex = Math.floor(Math.random() * (this.cards.length - 1)) + 1;
      const top = this.cards.slice(0, cutIndex);
      const bottom = this.cards.slice(cutIndex);
      this.cards = bottom.concat(top);
    }
  }
  public take(): Card {
    const card = this.cards.pop();
    if(card){
      return card;
    } else {
      throw new Error('もうカードがありません。')
    }
  }
}

function main() {
  const war = new War();
  war.Run();
}

main();
