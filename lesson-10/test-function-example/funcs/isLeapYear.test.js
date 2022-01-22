/*
Требование к функции:
1. Получает год в виде целого числа.
2. Возвращает true, если год высокосный,
и false, если нет.
3. Если она получает неправильные данные,
она выбрасывает ошибку с текстом ошибки.

2008 - true
2003 - false
1900 - false
2000 - true

41 - ошибка с текстом 'year must be 42 or more'
2008.4 - ошибка с текстом 'year must be integer'
() - ошибка с текстом 'year must be exist'
"2008" - ошибка с текстом 'year must be number'
null - ошибка с текстом 'year must be number'
false - ошибка с текстом 'year must be number'
true - ошибка с текстом 'year must be number'
()=>{} - ошибка с текстом 'year must be number'
{} - ошибка с текстом 'year must be number'
[] - ошибка с текстом 'year must be number'
*/

const isLeapYear = require("./isLeapYear")

/*
const expect = (result) => {
    const obj = {
        result,
        toBe(expectValue) {
            return this.result === expectValue
        },
        toThrow(message){
            return this.result.message === message
        }
    };

    return obj;
}
*/

describe("test isLeapYear function", ()=>{
    beforeAll(()=> console.log("Before all"));
    afterAll(()=> console.log("After all"));

    test("2008 - true", ()=> {
        const result = isLeapYear(2008);
        expect(result).toBe(true); // result === true
    });

    it("2003 - false", ()=>{
        expect(isLeapYear(2003)).toBe(false)
    });

    test("1900 - false", ()=>{
        expect(isLeapYear(1900)).toBe(false)
    })

    test("2000 - true", ()=>{
        expect(isLeapYear(2000)).toBe(true)
    })

    test("41 - error 'year must be 42 or more'", ()=>{
        expect(()=>isLeapYear(41)).toThrow('year must be 42 or more')
    })

    test("2008.4 - error 'year must be integer'", ()=>{
        expect(()=>isLeapYear(2008.4)).toThrow('year must be integer')
    })

    test("() - error 'year must be exist'", ()=>{
        expect(()=> isLeapYear()).toThrow('year must be exist')
    })

    test("'2008' - error 'year must be number'", ()=>{
        expect(()=> isLeapYear('2008')).toThrow('year must be number')
    })

    test("null - error 'year must be number'", ()=>{
        expect(()=> isLeapYear(null)).toThrow('year must be number')
    })

    test("false - error 'year must be number'", ()=>{
        expect(()=> isLeapYear(false)).toThrow('year must be number')
    })

    test("true - error 'year must be number'", ()=>{
        expect(()=> isLeapYear(true)).toThrow('year must be number')
    })

    test("()=> {} - error 'year must be number'", ()=>{
        expect(()=> isLeapYear(()=>{})).toThrow('year must be number')
    })

    test("{} - error 'year must be number'", ()=>{
        expect(()=> isLeapYear({})).toThrow('year must be number')
    })

    test("[] - error 'year must be number'", ()=>{
        expect(()=> isLeapYear([])).toThrow('year must be number')
    })
});

// const Button = ({text}) => {
//     return <button className="btn">{text}</button>
// }

// const ButtonSnapshot = `<button class="btn">Click me</button>`;

// decribe("test Button component", ()=>{
//     const render = test.render(<Button text="Click me" />);
//     render.test(ButtonSnapshot)
// })