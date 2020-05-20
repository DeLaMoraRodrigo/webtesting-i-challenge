const enhancer = require('./enhancer.js');

const actualItem = { name: "Sword", durability: 5, enhancement: 5 }
const hackedObject = { name: "Hacked Weapon", durability: 105, enhancement: 25 };
const perfectObject = { name: "Perfect", durability: 100, enhancement: 20 };
const undertunedObject = { name: "Undertuned", durability: -5, enhancement: -5 };
const emptyObject = {};
const array = [];

describe('enhancer', () => {
    it('should take an object and return the same object with a durability property of 100', () => {
        expect(enhancer.repair(actualItem)).toStrictEqual({ ...actualItem, durability: 100 });
        expect(enhancer.repair(hackedObject)).toStrictEqual({ message: "Nice Hacked Weapon" });
        expect(enhancer.repair(undertunedObject)).toStrictEqual({ message: "Nice Hacked Weapon" });
        expect(enhancer.repair(perfectObject)).toStrictEqual({ message: "Item is at max durability" });
        expect(enhancer.repair(emptyObject)).toBe(null);
        expect(enhancer.repair(array)).toBe(null);
        expect(enhancer.repair()).toBe(null);
    })

    it('should increase enhancement level by 1 if enhancement level is less than 20', () => {
        expect(enhancer.succeed(actualItem)).toStrictEqual({ ...actualItem, enhancement: actualItem.enhancement + 1 });
        expect(enhancer.succeed(hackedObject)).toStrictEqual({ message: "Nice Hacked Weapon" });
        expect(enhancer.succeed(undertunedObject)).toStrictEqual({ message: "Nice Hacked Weapon" });
        expect(enhancer.succeed(perfectObject)).toStrictEqual({ message: "Item is already fully enhanced" });
        expect(enhancer.succeed(emptyObject)).toBe(null);
        expect(enhancer.succeed(array)).toBe(null);
        expect(enhancer.succeed()).toBe(null);
    })

    it('should decrease enhancement by 5 if less than 15, by 10 if 15 or 16, by 1 if greater than 16', () => {
        const threeObject = { name: "Three", durability: 3, enhancement: 3 };
        const tenObject = { name: "Ten", durability: 10, enhancement: 10 };
        const fifteenObject = { name: "Fifteen", durability: 15, enhancement: 15 };
        const nineteenObject = { name: "Nineteen", durability: 19, enhancement: 19 };

        expect(enhancer.fail(actualItem)).toStrictEqual({ ...actualItem, enhancement: 0 });
        expect(enhancer.fail(threeObject)).toStrictEqual({ ...threeObject, enhancement: 0 });
        expect(enhancer.fail(tenObject)).toStrictEqual({ ...tenObject, enhancement: 5 });
        expect(enhancer.fail(fifteenObject)).toStrictEqual({ ...fifteenObject, enhancement: 5 });
        expect(enhancer.fail(nineteenObject)).toStrictEqual({ ...nineteenObject, enhancement: 18 });
        expect(enhancer.fail(hackedObject)).toStrictEqual({ message: "Nice Hacked Weapon" });
        expect(enhancer.fail(undertunedObject)).toStrictEqual({ message: "Nice Hacked Weapon" });
        expect(enhancer.fail(perfectObject)).toStrictEqual({ message: "Item is already fully enhanced" });
        expect(enhancer.fail(emptyObject)).toBe(null);
        expect(enhancer.fail(array)).toBe(null);
        expect(enhancer.fail()).toBe(null);
    })
})