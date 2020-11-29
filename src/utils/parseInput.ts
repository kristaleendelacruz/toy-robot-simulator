import validate from './validate';

const pipe = (...fns) => fns.reduce((f, g)=>(...args)=>g(f(...args)));

export interface PlaceParams {
  x: number | undefined;
  y: number | undefined;
  f: string | undefined;
}
interface ParsedInput {
  cmd: string;
  args: PlaceParams;
}
interface ParsedCommand {
  command: string;
  params: string;
}

const parseInputParams = ({command, params}:ParsedCommand):PlaceParams => {
  if (command!=='PLACE') {
    return;
  }

  const args = params && params.trim().split(',');
  if(!args || (args && args.length!==3)) {
    throw new Error('PLACE command requires 3 arguments');
  }

  const parsedParams = {
    x: Number(args[0]),
    y: Number(args[1]),
    f: args[2].trim(),
  };

  if(!validate.x(parsedParams.x) || !validate.y(parsedParams.y)) {
    throw new Error('Invalid coordinate. Valid coordinate is from 0 to 4');
  }
  if(!validate.f(parsedParams.f)) {
    throw new Error('Invalid direction. Valid directions are NORTH, SOUTH, EAST and WEST');
  }

  return parsedParams;
}

const validateCommand =(command:string) =>{
  if(!validate.cmd(command)) {
    throw new Error('Invalid command');
  }
  return command;
}

export const parseInput = (input: string):ParsedInput => {
  const {cmd, args} = pipe(
    str => str.toUpperCase().trim().split(' '),
    str => str.filter(item=>item!==' '),
    ([command, ...rest]) => ({
      cmd: validateCommand(command),
      args:parseInputParams({command, params:rest.join('')}),
    })
  )(input);

  return { cmd, args};
};