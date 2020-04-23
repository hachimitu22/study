import { IInput } from './io'
const readlineSync = require('readline-sync');

export default class Keyboard implements IInput {
  chooseNumber(min: number, max: number): number {
    return readlineSync.keyIn('', { limit: `$<${min}-${max}>`, hideEchoBack: true, mask: '' });
  }
}