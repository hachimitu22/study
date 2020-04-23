export default class Command {
  constructor(public readonly label: string, public readonly callback: () => void) {}
}