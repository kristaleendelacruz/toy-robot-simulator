import chalk from 'chalk';
import figlet from 'figlet';

interface Message {
  readonly color: string;
  readonly text: string;
}
const printHeader = ({color, text}: Message):void =>{
  console.log(
    chalk[color](
      figlet.textSync(text, {horizontalLayout: 'full'})
    )
  );
}

const printText = ({color, text}: Message):void =>{
  console.log(chalk[color](text));
}

export {printHeader, printText};