const varifyLogin  = require('./controller/user').varifyLogin

describe("varifyLogin", () => {
    test('equal numbers should result in true', () => {
        expect(varifyLogin(1,2,1,2)).toBe(true)
    })
    test('different numbers should result in false', () => {
        expect(varifyLogin(1,2,3,4)).toBe(false)
    })
    test('equal string should result in true', () => {
        expect(varifyLogin("1","2","1","2")).toBe(true)
    })
    test('differrent strings should result in false', () => {
        expect(varifyLogin("1","2","3","4")).toBe(false)
    })
    test('equal strings and numbers should result in true', () => {
        expect(varifyLogin(1,"2",1,"2")).toBe(true)
    })
    test('differrent strings and numbers should result in false', () => {
        expect(varifyLogin("1",2,"3",4)).toBe(false)
    })
})