import {PlaceParams} from '../utils/parseInput';
import {Robot} from '../index';
import {DIRECTIONS} from '../utils/constants';
import {printText} from '../utils/message';
import validate from '../utils/validate';
const place = (args:PlaceParams, robot:Robot):Robot =>{
  return {
    ...robot,
    ...args,
    isPlaced: true,
  }
}

const move = (robot:Robot):Robot => {
  const {f: facing, x, y} = robot;
  let newX =x;
  let newY =y;

  switch (facing) {
    case 'NORTH': newY ++; break;
    case 'SOUTH': newY --; break;
    case 'EAST': newX ++; break;
    case 'WEST': newX --; break;
  }

  if(!validate.x(newX) || !validate.y(newY)) {
    printText({color:'yellow', text: 'Already reached the end of tabletop. Turn LEFT or RIGHT before moving.'})
    return robot;
  }

  return {...robot, x:newX, y:newY};
}

const turn = (cmd:string, robot:Robot):Robot => {
  const {f: facing} = robot;
  let newDirectionIndex = DIRECTIONS.indexOf(facing);

  if(cmd === 'LEFT')  newDirectionIndex--;
  else if(cmd === 'RIGHT') newDirectionIndex++;

  if(newDirectionIndex < 0 ) newDirectionIndex=DIRECTIONS.length-1;
  else if(newDirectionIndex > 3) newDirectionIndex=0;

  return {...robot, f: DIRECTIONS[newDirectionIndex]};
}

export {
  place,
  move,
  turn
}