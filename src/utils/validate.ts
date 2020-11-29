import {COMMANDS, DIRECTIONS, MAX_COORDINATE, MIN_COORDINATE} from './constants';

export default {
  x: (x:number):boolean => typeof x ==='number' && x <= MAX_COORDINATE && x>=MIN_COORDINATE,
  y: (y:number):boolean => typeof y ==='number' && y <= MAX_COORDINATE && y>=MIN_COORDINATE,
  f: (f:string):boolean => typeof f ==='string' && DIRECTIONS.includes(f),
  cmd: (cmd:string):boolean => typeof cmd === 'string' && COMMANDS.includes(cmd),
}