const readlineSync = require('readline-sync');

class War {
  private players: IPlayer[];
  private stack: Stack;

  constructor() {
    this.players = [];
    this.stack = new Stack();
    this.stack.shuffle();
  }
  public Run(): void {
    this.GameStart();
    this.DecidePlayers();

    this.Play();
    while (this.IsContinue()) {
      this.Continue();
    }

    this.GameEnd();
  }
  private IsContinue(): boolean {
    const str: string = readlineSync.question(`もう一度対戦する場合は1を入力してください。終了する場合は1以外を入力してください:`);
    const num: number = parseInt(str);

    if (!isNaN(num) && num === 1) {
      return true;
    } else {
      return false;
    }
  }
  private GameStart(): void {
    readlineSync.question(`ゲームを開始するには何かキーを押してください`);
  }
  private DecidePlayers(): void {
    // input number of user
    do {
      const str: string = readlineSync.question(`ユーザー人数を入力してください:`);
      const num: number = parseInt(str);

      if (!isNaN(num) && 0 <= num && num < this.stack.remain()) {
        this.players.length = num;
        console.log(`「ユーザー人数は ${num} 人です」`);
        break;
      } else {
        console.log('無効な値です');
      }
    } while (true);

    // input users name
    for (let i = 0; i < this.players.length; i++){
      const count: number = i + 1;

      do {
        const name: string = readlineSync.question(`ユーザー${count}人目の名前を入力してください:`);

        if (name && name.length <= 20) {
          this.players[i] = new Player(name);
          console.log(`ユーザー${count}人目の名前は ${name} です`)
          break;
        } else {
          console.log('無効な値です')
        }
      } while (true);
    }

    // input number of cpu
    do {
      const str: string = readlineSync.question('CPU人数を入力してください:');
      const num: number = parseInt(str);

      if (!isNaN(num)) {
        const sum = this.players.length + num;

        if (2 <= sum && sum <= this.stack.remain()) {
          const cpus: CpuPlayer[] = Array.from({ length: num }).map((_, i: number) => {
            return new CpuPlayer(`CPU${i + 1}`);
          });
          console.log(`CPU人数は ${num} 人です」`);
          this.players = this.players.concat(cpus);
          break;
        }
      }
      console.log('無効な値です');

    } while (true);
  }
  private Play(): void {
    if (this.players.length > this.stack.remain()) {
      readlineSync.question('山札を新しくします、何かキーを押してください');
      this.stack = new Stack();
      readlineSync.question('山札をシャッフルします、何かキーを押してください');
      this.stack.shuffle();
      console.log('シャッフルが終わりました');
    }

    readlineSync.question('カードを配ります、何かキーを押してください');
    this.players.forEach((player: IPlayer) => {
      const card = this.stack.take();
      player.receiveCard(card);
    });


    readlineSync.question('勝敗を表示します。何かキーを押してください');
    const maxNumber = Math.max(...this.players.map((player: IPlayer) => {
      return player.showCard().num;
    }));

    this.players.forEach((player: IPlayer) => {
      const num = player.showCard().num;
      const message = maxNumber === num ? '勝ち' : '負け';

      console.log(`${player.name} : ${num} : ${message}`);
    });
  }
  private Continue(): void {
    readlineSync.question('もう一度対戦します。何かキーを押してください');
    this.Play();
  }
  private GameEnd(): void{
    readlineSync.question('ゲームを終了します。何かキーを押してください');
  }
}

interface IPlayer {
  readonly name: string;
  receiveCard(card: Card): void;
  showCard(): Card;
}

abstract class BasePlayer implements IPlayer {
  public readonly name: string;
  private card: Card | null;

  constructor(name: string) {
    this.card = null;
    this.name = name;
  }
  public receiveCard(card: Card): void {
    this.card = card;
  }
  public showCard(): Card {
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
  constructor(public readonly suit: string, public readonly num: number) { }
}

class Stack {
  private cards: Card[];

  constructor() {
    const suits: string[] = ['spade', 'heart', 'diamond', 'club'];
    const numbers: number[] = Array.from({ length: 13 }, (_, i: number) => i + 1);

    this.cards = [];

    suits.forEach((suit: string) => {
      numbers.forEach((num: number) => {
        const card = new Card(suit, num);
        this.cards.push(card);
      });
    });
  }
  public shuffle(): void {
    // カードを切るのを再現してみる
    const cutNum: number = 5;

    const _sh = (cs: Card[], count: number): Card[] => {
      if (count >= cutNum || cs.length <= 1) {
        return cs;
      }

      const cutIndex = Math.floor(Math.random() * (cs.length - 1)) + 1;
      const top = cs.slice(0, cutIndex);
      const bottom = cs.slice(cutIndex);

      return _sh(bottom, count + 1).concat(top);
    };

    for (let i = 0; i < 100; i++){
      this.cards = _sh(this.cards, 0);
    }
  }
  public take(): Card {
    const card = this.cards.shift();
    if(card){
      return card;
    } else {
      throw new Error('もうカードがありません。')
    }
  }
  public remain(): number {
    return this.cards.length;
  }
}

function main() {
  const war = new War();
  war.Run();
}

main();
