const enhancer = require('./enhancer.js');

const actualItem = { name: "Sword", durability: 5, enhancement: 5 }
const hackedObject = { name: "Hacked Weapon", durability: 105, enhancement: 25 };
const perfectObject = { name: "Perfect", durability: 100, enhancement: 20 };
const undertunedObject = { name: "Undertuned", durability: -5, enhancement: -5 };
const zero = { name: "Zero", durability: 0, enhancement: 0 };
const emptyObject = {};
const array = [];

describe('repair', () => {
    it('should take an object and return the same object with a durability property of 100 if the durability is less than 100 and greater than -1', () => {
        expect(enhancer.repair(actualItem)).toStrictEqual({ ...actualItem, durability: 100 });
        expect(enhancer.repair(zero)).toStrictEqual({ ...zero, durability: 100 });
    })
    
    it('should return an object with the message "Nice Hacked Weapon" if the durability is less than 0 or greater than 100', () => {
        expect(enhancer.repair(hackedObject)).toStrictEqual({ message: "Nice Hacked Weapon" });
        expect(enhancer.repair(undertunedObject)).toStrictEqual({ message: "Nice Hacked Weapon" });
    })
    
    it('should return an object with the message "Item is at max durability" if the durability is 100', () => {
        expect(enhancer.repair(perfectObject)).toStrictEqual({ message: "Item is at max durability" });
    })
    
    it('should return null if the item is empty, undefined, or not an object', () => {
        expect(enhancer.repair(emptyObject)).toBe(null);
        expect(enhancer.repair(array)).toBe(null);
        expect(enhancer.repair()).toBe(null);
    })
})

describe('succeed', () => {
    it('should increase enhancement level by 1 if enhancement level is less than 20', () => {
        expect(enhancer.succeed(actualItem)).toStrictEqual({ ...actualItem, enhancement: actualItem.enhancement + 1 });
        expect(enhancer.succeed(zero)).toStrictEqual({ ...zero, enhancement: zero.enhancement + 1 });
    })
    
    it('should return an object with the message "Nice Hacked Weapon" if the enhancement is less than 0 or greater than 20', () => {
        expect(enhancer.succeed(hackedObject)).toStrictEqual({ message: "Nice Hacked Weapon" });
        expect(enhancer.succeed(undertunedObject)).toStrictEqual({ message: "Nice Hacked Weapon" });
    })
    
    it('should return an object with the message "Item is already fully enhanced" if the enhancement is 20', () => {
        expect(enhancer.succeed(perfectObject)).toStrictEqual({ message: "Item is already fully enhanced" });
    })
    
    it ('should return null if the item is empty, undefined, or not an object', () => {
        expect(enhancer.succeed(emptyObject)).toBe(null);
        expect(enhancer.succeed(array)).toBe(null);
        expect(enhancer.succeed()).toBe(null);
    })
})

describe('fail', () => {
    const threeObject = { name: "Three", durability: 3, enhancement: 3 };
    const tenObject = { name: "Ten", durability: 10, enhancement: 10 };
    const fifteenObject = { name: "Fifteen", durability: 15, enhancement: 15 };
    const nineteenObject = { name: "Nineteen", durability: 19, enhancement: 19 };

    it('should decrease enhancement by 5 if less than 15, by 10 if 15 or 16, by 1 if greater than 16', () => {
        expect(enhancer.fail(zero)).toStrictEqual({ ...zero, enhancement: 0 });
        expect(enhancer.fail(threeObject)).toStrictEqual({ ...threeObject, enhancement: 0 });
    })
    
    it('should decrease enhancement by 5 if less than 15 and greater than 4', () => {
        expect(enhancer.fail(actualItem)).toStrictEqual({ ...actualItem, enhancement: 0 });
        expect(enhancer.fail(tenObject)).toStrictEqual({ ...tenObject, enhancement: 5 });
    })
    
    it('should decrease enhancement by 10 if 15 or 16', () => {
        expect(enhancer.fail(fifteenObject)).toStrictEqual({ ...fifteenObject, enhancement: 5 });
    })
    
    it('should decrease enhancement by 1 if greater than 16 and less than 20', () => {
        expect(enhancer.fail(nineteenObject)).toStrictEqual({ ...nineteenObject, enhancement: 18 });
    })
    
    it('should return the message "Why did you try to enhance an item that was already fully enhanced" if enhancement is 20', () => {
        expect(enhancer.fail(perfectObject)).toStrictEqual({ message: "Why did you try to enhance an item that was already fully enhanced" });
    })
    
    it('should return the message "Nice Hacked Weapn" if the enhancement is less than 0 or greater than 20', () => {
        expect(enhancer.fail(hackedObject)).toStrictEqual({ message: "Nice Hacked Weapon" });
        expect(enhancer.fail(undertunedObject)).toStrictEqual({ message: "Nice Hacked Weapon" });
    })
    
    it('should return null if the item is empty, undefined, or not an object', () => {
        expect(enhancer.fail(emptyObject)).toBe(null);
        expect(enhancer.fail(array)).toBe(null);
        expect(enhancer.fail()).toBe(null);
    })
})

describe('get', () => {
    it('should add a level to the name of the item if the enhancement of the item is greater than 0 and less than 21', () => {
        expect(enhancer.get(actualItem)).toStrictEqual({ ...actualItem, name: `${actualItem.name} [+${actualItem.enhancement}]` });
        expect(enhancer.get(perfectObject)).toStrictEqual({ ...perfectObject, name: `${perfectObject.name} [+${perfectObject.enhancement}]` });
    })
    
    it('should return the message "Nice Hacked Weapon" if the enhancement is less than 0 or greater than 20', () => {
        expect(enhancer.get(hackedObject)).toStrictEqual({ message: "Nice Hacked Weapon" });
        expect(enhancer.get(undertunedObject)).toStrictEqual({ message: "Nice Hacked Weapon" });
    })
    
    it('should return the object with no changes if the enhancement level is 0', () => {
        expect(enhancer.get(zero)).toStrictEqual(zero);
    })
    
    it('should return null if the item is empty, undefined, or not an object', () => {
        expect(enhancer.get(emptyObject)).toBe(null);
        expect(enhancer.get(array)).toBe(null);
        expect(enhancer.get()).toBe(null);        
    })
})