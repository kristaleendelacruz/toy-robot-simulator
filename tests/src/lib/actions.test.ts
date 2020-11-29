import {assert} from 'chai';
import sinon from 'sinon';

import {processCommand, handleInput} from '../../../src/lib/actions';
import * as reducers from '../../../src/lib/reducers';
import * as message from '../../../src/utils/message';
import * as parseInput from '../../../src/utils/parseInput';

describe('src :: lib :: actions', () => {
  let reducersStub,messageStub, parseInputStub;
  beforeEach(() => {
    reducersStub = sinon.stub(reducers);
    messageStub = sinon.stub(message);
    parseInputStub = sinon.stub(parseInput);
  });
  afterEach(() => {
    sinon.restore();
  });

  describe('processCommand', () => {
    let fn:Function;

    beforeEach(() => {
      fn = processCommand;
    });

    it('must be a function that accepts one param', () => {
      assert.isFunction(fn);
      assert.lengthOf(fn, 1);
    });

    it('must not update robot state when robot.isPlaced is false and command is not "PLACE"', () => {
      const robot = { isPlaced: false };
      const actual = fn({cmd:'MOVE', args:null, robot});
      assert.deepEqual(actual, robot);
      sinon.assert.calledOnce(messageStub.printText);
      sinon.assert.notCalled(reducersStub.move);
      sinon.assert.notCalled(reducersStub.place);
      sinon.assert.notCalled(reducersStub.turn);
    });

    it('must return whatever each expected reducer call returns', () => {
      const robot = { isPlaced: true };

      const validScenarios = [
        { params: {cmd: 'PLACE', args:'', robot}, expected: ()=> sinon.assert.calledOnce(reducersStub.place)},
        { params: {cmd: 'MOVE', args:'', robot}, expected: ()=> sinon.assert.calledOnce(reducersStub.move)},
        { params: {cmd: 'LEFT', args:'', robot}, expected: ()=> sinon.assert.calledOnce(reducersStub.turn)},
        { params: {cmd: 'RIGHT', args:'', robot}, expected: ()=> sinon.assert.calledTwice(reducersStub.turn)},
        { params: {cmd: 'REPORT', args:'', robot}, expected: ()=> sinon.assert.calledOnce(messageStub.printText)},
      ];

      validScenarios.forEach(({params, expected}) => {
        fn(params);
        expected();
      });
    });
  });

  describe('handleInput', () => {
    let fn:Function;

    beforeEach(() => {
      fn = handleInput;
    });

    it('must be a function that accepts one param', () => {
      assert.isFunction(fn);
      assert.lengthOf(fn, 1);
    });

    it('must not update robot state when parseInput throws error', () => {
      const robot = { isPlaced: true };
      parseInputStub.parseInput.throws(new Error());

      const actual = fn({input:'INPUT', robot});

      assert.deepEqual(actual, robot);
      sinon.assert.calledOnce(parseInputStub.parseInput);
      sinon.assert.calledOnce(messageStub.printText);
    });

    it('must call processCommand after validating input', () => {
      const robot = { isPlaced: true };
      parseInputStub.parseInput.returns({cmd:'CMD', args:'ARGS'});

      const actual = fn({input:'INPUT', robot});

      assert.deepEqual(actual, robot);
      sinon.assert.calledOnce(parseInputStub.parseInput);
      sinon.assert.notCalled(messageStub.printText);
    });
  });

});