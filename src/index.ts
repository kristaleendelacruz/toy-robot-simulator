import clear from 'clear';
import {PlaceParams} from './utils/parseInput';
import {printHeader, printText} from './utils/message';
import {handleInput} from './lib/actions';
import ReadLine from 'readline';

export interface Robot extends PlaceParams {
  isPlaced: boolean;
}
let robot: Robot = {
  x: undefined,
  y: undefined,
  f: undefined,
  isPlaced: false,
}

const readline = ReadLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

clear();
printHeader({color: 'yellow', text: 'Toy Robot'});
printText({color: 'green', text:`Send command to the robot`});
printText({color: 'white', text:`
"PLACE 1,1,NORTH" will put the toy robot on the table in position 1,1 and facing NORTH\n
MOVE will move the toy robot one unit forward in the direction it is currently facing.\n
LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing  the position of the robot.\n
REPORT will announce the X,Y and F of the robot.`});

readline.on('line',(line)=>{
  robot = handleInput({input: line.trim(), robot});
  readline.prompt();
});
readline.prompt();