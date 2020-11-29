import {assert} from 'chai';

import validate from '../../../src/utils/validate';
import {COMMANDS, DIRECTIONS, MAX_COORDINATE, MIN_COORDINATE} from '../../../src/utils/constants';

describe('src :: utils :: validate', () => {
  describe('x validation', () => {
    let fn:Function;

    beforeEach(() => {
      fn = validate.x;
    });

    it('must be a function that accepts one param', () => {
      assert.isFunction(fn);
      assert.lengthOf(fn, 1);
    });
    
    it('must return false if the input us of the wrong type', () => {
      const expected = false;

      const badXValues = [
        undefined,
        null,
        NaN,
        'string',
        {},
        [],
      ];

      badXValues.forEach((x) => {
        const actual = fn(x);

        assert.equal(actual, expected);
      });
    });

    it('must return false if the input value is outside the min/max range', () => {
      const expected = false;

      const badXValues = [
        MIN_COORDINATE-1,
        MAX_COORDINATE+1,
      ];

      badXValues.forEach((x) => {
        const actual = fn(x);

        assert.equal(actual, expected);
      });
    });

    it('must return true if the input value is within allowed range', () => {
      const expected = true;

      const goodXValues = [
        MIN_COORDINATE,
        MAX_COORDINATE,
      ];

      goodXValues.forEach((x) => {
        const actual = fn(x);

        assert.equal(actual, expected);
      });
    });
  });

  describe('y validation', () => {
    let fn:Function;

    beforeEach(() => {
      fn = validate.y;
    });

    it('must be a function that accepts one param', () => {
      assert.isFunction(fn);
      assert.lengthOf(fn, 1);
    });
    
    it('must return false if the input us of the wrong type', () => {
      const expected = false;

      const badYValues = [
        undefined,
        null,
        NaN,
        'string',
        {},
        [],
      ];

      badYValues.forEach((x) => {
        const actual = fn(x);

        assert.equal(actual, expected);
      });
    });

    it('must return false if the input value is outside the min/max range', () => {
      const expected = false;

      const badYValues = [
        MIN_COORDINATE-1,
        MAX_COORDINATE+1,
      ];

      badYValues.forEach((x) => {
        const actual = fn(x);

        assert.equal(actual, expected);
      });
    });

    it('must return true if the input value is within allowed range', () => {
      const expected = true;

      const goodYValues = [
        MIN_COORDINATE,
        MAX_COORDINATE,
      ];

      goodYValues.forEach((x) => {
        const actual = fn(x);

        assert.equal(actual, expected);
      });
    });
  });

  describe('f validation', () => {
    let fn:Function;

    beforeEach(() => {
      fn = validate.f;
    });

    it('must be a function that accepts one param', () => {
      assert.isFunction(fn);
      assert.lengthOf(fn, 1);
    });
    
    it('must return false if the input us of the wrong type', () => {
      const expected = false;

      const badFValues = [
        undefined,
        null,
        NaN,
        1,
        {},
        [],
      ];

      badFValues.forEach((x) => {
        const actual = fn(x);

        assert.equal(actual, expected);
      });
    });

    it('must return false if the input value is outside the directions range', () => {
      const expected = false;

      const badFValues = [
        'UP',
        'DOWN',
        'LEFT'
      ];

      badFValues.forEach((x) => {
        const actual = fn(x);

        assert.equal(actual, expected);
      });
    });

    it('must return true if the input value is within allowed directions range', () => {
      const expected = true;

      const goodFValues = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

      goodFValues.forEach((x) => {
        const actual = fn(x);

        assert.equal(actual, expected);
      });
    });
  });

  describe('cmd validation', () => {
    let fn:Function;

    beforeEach(() => {
      fn = validate.cmd;
    });

    it('must be a function that accepts one param', () => {
      assert.isFunction(fn);
      assert.lengthOf(fn, 1);
    });
    
    it('must return false if the input us of the wrong type', () => {
      const expected = false;

      const badCmdValues = [
        undefined,
        null,
        NaN,
        1,
        'string',
        {},
        [],
      ];

      badCmdValues.forEach((x) => {
        const actual = fn(x);

        assert.equal(actual, expected);
      });
    });

    it('must return false if the input value is outside the commands range', () => {
      const expected = false;

      const badCmdValues = [
        'UP',
        'DOWN',
        'TURN'
      ];

      badCmdValues.forEach((x) => {
        const actual = fn(x);

        assert.equal(actual, expected);
      });
    });

    it('must return true if the input value is within allowed commands range', () => {
      const expected = true;

      const goodCmdValues = ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'];

      goodCmdValues.forEach((x) => {
        const actual = fn(x);

        assert.equal(actual, expected);
      });
    });
  });
});