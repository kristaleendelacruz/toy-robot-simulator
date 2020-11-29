import {assert} from 'chai';
import sinon from 'sinon';

import {place,
  move,
  turn} from '../../../src/lib/reducers';
import * as message from '../../../src/utils/message';
import validate from '../../../src/utils/validate';

describe('src :: lib :: reducers', () => {
  let messageStub, validateStub;
  beforeEach(() => {
    messageStub = sinon.stub(message);
    validateStub = sinon.stub(validate);
  });
  afterEach(() => {
    sinon.restore();
  });

  describe('place', () => {
    let fn:Function;

    beforeEach(() => {
      fn = place;
    });

    it('must be a function that accepts two params', () => {
      assert.isFunction(fn);
      assert.lengthOf(fn, 2);
    });

    it('must update robot.isPlaced to true and combine args input to current robot state', () => {
      const robot = { isPlaced: false };
      const args ={x:1, y:1, f:'NORTH'};
      const actual = fn(args, robot);
      assert.deepEqual(actual, {...args, isPlaced: true});
    });
  });

  describe('move', () => {
    let fn:Function;

    beforeEach(() => {
      fn = move;
    });

    it('must be a function that accepts one param', () => {
      assert.isFunction(fn);
      assert.lengthOf(fn, 1);
    });

    it('must not update robot state if x coordinate is invalid', () => {
      const robot = { x:4, y:1, f: 'EAST', isPlaced: true, };
      validateStub.x.returns(false);
      validateStub.y.returns(true);
      const actual = fn(robot);
      assert.deepEqual(actual, robot);
      sinon.assert.calledOnce(messageStub.printText);
    });

    it('must not update robot state if y coordinate is invalid', () => {
      const robot = { x:1, y:4, f: 'NORTH', isPlaced: true, };
      validateStub.x.returns(true);
      validateStub.y.returns(false);
      const actual = fn(robot);
      assert.deepEqual(actual, robot);
      sinon.assert.calledOnce(messageStub.printText);
    });

    it('must return expected X and Y values for "facing" state values', () => {
      validateStub.x.returns(true);
      validateStub.y.returns(true);

      const scenarios = [
        { robot: { y: 0, x: 0, f: 'NORTH' }, expected: { y: 1,  x: 0, f: 'NORTH' } },
        { robot: { y: 1, x: 0, f: 'SOUTH' }, expected: { y: 0,  x: 0, f: 'SOUTH' } },
        { robot: { y: 0, x: 0, f: 'EAST' }, expected: { y: 0,  x: 1, f: 'EAST' } },
        { robot: { y: 0, x: 1, f: 'WEST' }, expected: { y: 0,  x: 0, f: 'WEST' } },
      ];

      scenarios.forEach((scenario) => {
        const actual = fn(scenario.robot);
        assert.deepEqual(actual, scenario.expected);
      });
    });
  });

  describe('turn', () => {
    let fn:Function;

    beforeEach(() => {
      fn = turn;
    });

    it('must be a function that accepts two params', () => {
      assert.isFunction(fn);
      assert.lengthOf(fn, 2);
    });

    it('must return a new state with the same f (facing) value for unexpected cmd directions', () => {
      const scenarios = [
        { robot: { f: 'NORTH' }, cmd: 'UP', expected: { f: 'NORTH' } },
        { robot: { f: 'SOUTH' }, cmd: 'DOWN', expected: { f: 'SOUTH' } },
      ];

      scenarios.forEach((scenario) => {
        const actual = fn(scenario.cmd, scenario.robot);

        assert.deepEqual(actual, scenario.expected);
      });
    });

    it('must update robot.f (facing) value based on current robot facing', () => {
      const scenarios = [
        { robot: { f: 'NORTH' }, cmd: 'LEFT', expected: { f: 'WEST' } },
        { robot: { f: 'NORTH' }, cmd: 'RIGHT', expected: { f: 'EAST' } },
        { robot: { f: 'EAST' }, cmd: 'LEFT', expected: { f: 'NORTH' } },
        { robot: { f: 'EAST' }, cmd: 'RIGHT', expected: { f: 'SOUTH' } },
        { robot: { f: 'SOUTH' }, cmd: 'LEFT', expected: { f: 'EAST' } },
        { robot: { f: 'SOUTH' }, cmd: 'RIGHT', expected: { f: 'WEST' } },
        { robot: { f: 'WEST' }, cmd: 'LEFT', expected: { f: 'SOUTH' } },
        { robot: { f: 'WEST' }, cmd: 'RIGHT', expected: { f: 'NORTH' } },
      ];

      scenarios.forEach((scenario) => {
        const actual = fn(scenario.cmd, scenario.robot);

        assert.deepEqual(actual, scenario.expected);
      });
    });
  });
});