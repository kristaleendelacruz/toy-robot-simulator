import {assert} from 'chai';
import sinon from 'sinon';

import {printHeader, printText} from '../../../src/utils/message';

describe('src :: utils :: message', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('printHeader', () => {
    let fn:Function;

    beforeEach(() => {
      fn = printHeader;
      sinon.stub(console, 'log');
    });

    it('must be a function that accepts one param', () => {
      assert.isFunction(fn);
      assert.lengthOf(fn, 1);
    });

    it('must call console.log', () => {
      const args ={color:'yellow',text:'Hi'};
      fn(args);
      sinon.assert.calledOnce(console.log);
    });
  });

  describe('printText', () => {
    let fn:Function;

    beforeEach(() => {
      fn = printText;
      sinon.stub(console, 'log');
    });

    it('must be a function that accepts one param', () => {
      assert.isFunction(fn);
      assert.lengthOf(fn, 1);
    });

    it('must call console.log', () => {
      const args ={color:'yellow',text:'Hi'};
      fn(args);
      sinon.assert.calledOnce(console.log);
    });
  });
});