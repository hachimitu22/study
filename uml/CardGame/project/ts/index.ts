import CardGameManager from "./cardgame-manager";
import Keyboard from "./keyboard";
import CommandPrompt from "./commandprompt";

(function main() {
  (new CardGameManager(new Keyboard(), new CommandPrompt(40, 5))).run();
})();
