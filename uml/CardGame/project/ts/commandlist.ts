import Command from "./command";

export default class CommandList {
  private commands: Command[];

  constructor() {
    this.commands = [];
  }
  public addCommand(label: string, callback: () => void): void {
    this.commands.push(new Command(label, callback));
  }
  public execute(label: string): void {
    const command = this.commands.find((c: Command) => c.label === label);

    if (command instanceof Command) {
      command.callback();
    } else {
      throw new Error(`${label} は存在しないコマンドです。`);
    }
  }
  public getLabels(): string[] {
    return this.commands.map((c: Command) => c.label);
  }
  public choice(labels: string[]): CommandList {
    const cl = new CommandList();
    const list = this.commands.filter((c: Command) => {
      return labels.find((label: string) => label === c.label);
    });
    cl.commands.push(...list);

    return cl;
  }
  public toString(): string {
    const strings: string[] = this.commands.map((c: Command, i: number) => {
      return `[${i}] ${c.label}`;
    });

    return strings.join(' ');
  }
  public size(): number {
    return this.commands.length;
  }
}