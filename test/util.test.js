const assert = require('assert');
const expect = require('chai').expect;
const util = require('../util');
const PAGE_SIZE = 30;

describe('Util', () => {
    describe('getPageAndPosition', () => {
        it('generates the page and position correctly', () => {
            expect(util.getPageAndPosition(15, PAGE_SIZE)).to.eql([15, 1, 14]);
            expect(util.getPageAndPosition(30, PAGE_SIZE)).to.eql([30, 1, 29]);
            expect(util.getPageAndPosition(31, PAGE_SIZE)).to.eql([31, 2, 0]);
            expect(util.getPageAndPosition(45, PAGE_SIZE)).to.eql([45, 2, 14]);
            expect(util.getPageAndPosition(60, PAGE_SIZE)).to.eql([60, 2, 29]);
            expect(util.getPageAndPosition(61, PAGE_SIZE)).to.eql([61, 3, 0]);
            expect(util.getPageAndPosition(200, PAGE_SIZE)).to.eql([200, 7, 19]);
        });
    });
});