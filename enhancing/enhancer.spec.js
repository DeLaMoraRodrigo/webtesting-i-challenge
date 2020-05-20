const enhancer = require('./enhancer.js');
// test away!
describe('enhancer', () => {
    it('should take an object and return the same object with a durability property of 100', () => {
        expect(enhancer.repair({ durability: 5 })).toBe({ durability: 100 })
    })
})