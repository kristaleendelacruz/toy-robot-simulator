import {parseInput, PlaceParams} from '../utils/parseInput';
import {Robot} from '../index';
import {printText} from '../utils/message';
import { COMMANDS } from '../utils/constants';
import {place, move, turn} from './reducers';

interface LineInput {
  input: string,
  robot: Robot
}

interface CommandInput {
  cmd: string,
  args: PlaceParams,
  robot: Robot,
}

const processCommand = ({cmd, args, robot}:CommandInput):Robot=>{
  if((robot && !robot.isPlaced) && cmd!=='PLACE' && COMMANDS.includes(cmd)) {
    printText({color: 'yellow', text:'Command ignored. First command should be PLACE'});
    return robot;
  }
  switch(cmd) {
    case 'PLACE': return place(args, robot);
    case 'MOVE': return move(robot);
    case 'LEFT':
    case 'RIGHT': return turn(cmd,robot);
    case 'REPORT':
      const {x, y, f} = robot;
      printText({color:'white', text:`${x},${y},${f}`});
  }
  return robot;
}

const handleInput = ({input, robot}:LineInput):Robot=>{
  try {
    const { cmd, args } = parseInput(input);
    return processCommand({cmd, args, robot});
  } catch (error) {
    printText({color:'yellow', text:error.message});
    return robot;
  }
}

export {processCommand, handleInput};