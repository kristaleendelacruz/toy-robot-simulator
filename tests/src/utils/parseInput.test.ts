import {assert} from 'chai';
import sinon from 'sinon';

import {parseInput} from '../../../src/utils/parseInput';
import validate from '../../../src/utils/validate';

describe('src :: utils :: parseInput', () => {
  let validateStub;
  beforeEach(() => {
    validateStub = sinon.stub(validate);
  });
  afterEach(() => {
    sinon.restore();
  });

  describe('parseInput', () => {
    let fn:Function;

    beforeEach(() => {
      fn = parseInput;
    });

    it('must be a function that accepts one param', () => {
      assert.isFunction(fn);
      assert.lengthOf(fn, 1);
    });

    it('must throw error if invalid command', () => {
      try {
        validateStub.cmd.returns(false);
        fn('INVALID');
      } catch(error) {
        assert.instanceOf(error, Error);
        assert.equal(error.message, 'Invalid command');
      }
    });

    it('must return first word as command if valid and undefined args if command is not PLACE', () => {
      validateStub.cmd.returns(true);
      const actual = fn('LEFT');
      assert.deepEqual(actual, {cmd:'LEFT', args:undefined});
    });

    it('must throw error if PLACE command does not have args', () => {
      try {
        validateStub.cmd.returns(true);
        fn('PLACE');
      } catch(error) {
        assert.instanceOf(error, Error);
        assert.equal(error.message, 'PLACE command requires 3 arguments');
      }
    });

    it('must throw error if PLACE command does not have 3 args', () => {
      const invalidPlaceArgs = [ 'PLACE 1', 'PLACE 1,2','PLACE 1,2,3,4'];
      invalidPlaceArgs.forEach((input)=>{
        try {
          validateStub.cmd.returns(true);
          fn(input);
        } catch(error) {
          assert.instanceOf(error, Error);
          assert.equal(error.message, 'PLACE command requires 3 arguments');
        }
      });
    });

    it('must throw error if PLACE command have invalid x coordinate', () => {
      try {
        validateStub.cmd.returns(true);
        validateStub.x.returns(false);
        fn('PLACE A,B,C');
      } catch(error) {
        assert.instanceOf(error, Error);
        assert.equal(error.message, 'Invalid coordinate. Valid coordinate is from 0 to 4');
      }
    });

    it('must throw error if PLACE command have invalid y coordinate', () => {
      try {
        validateStub.cmd.returns(true);
        validateStub.x.returns(true);
        validateStub.y.returns(false);
        fn('PLACE A,B,C');
      } catch(error) {
        assert.instanceOf(error, Error);
        assert.equal(error.message, 'Invalid coordinate. Valid coordinate is from 0 to 4');
      }
    });

    it('must throw error if PLACE command have invalid facing param', () => {
      try {
        validateStub.cmd.returns(true);
        validateStub.x.returns(true);
        validateStub.y.returns(true);
        validateStub.f.returns(false);
        fn('PLACE A,B,C');
      } catch(error) {
        assert.instanceOf(error, Error);
        assert.equal(error.message, 'Invalid direction. Valid directions are NORTH, SOUTH, EAST and WEST');
      }
    });

    it('must return PLACE args as {x,y,f}', () => {
      validateStub.cmd.returns(true);
      validateStub.x.returns(true);
      validateStub.y.returns(true);
      validateStub.f.returns(true);
      const actual = fn('PLACE 1,2,SOUTH');
      assert.deepEqual(actual, {cmd:'PLACE', args:{x:1,y:2,f:'SOUTH'}});
    });
  });
});