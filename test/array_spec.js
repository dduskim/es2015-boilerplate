import {expect} from 'chai';

describe('Array', () => {
    it('forEach method should iterate arrays elements', () => {
        const array = [1, 2, 3];
        let result = 0;
        array.forEach((element, index) => {
            result += element;
        });
        expect(result).to.equal(6);
    });
});