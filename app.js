"use strict";
//HTMLInputElement, HTMLButtonElement are general html DOM type present in TS
//const num1Element = document.getElementById('num1'); //tell this is input type
const num1Element = document.getElementById('num1'); // type casting.
const num2Element = document.getElementById('num2');
const btn = document.querySelector('button'); // it is queried and selected as button, so its type is known.
// we add ! at end of button because we know for sure that it is a button and we want TS ignore checking it.
/*
function add(a: number, b: number) { //if you dont know type of variable you can set it to type "any"
    return a + b;
}
*/
//creating array - array is generic type, outer type encloses values inside, that have their own type.
//const numResults = []; // we need to specify type of array we are creating
//const textResults = [];
//const numResults: Array<number> = []; // we define array like this
//shortcut to define array -
const numResults = []; // number[] is called array type.
const textResults = []; // string[] is called array type specify that it is array of string
;
//function add(num1: number | string, num2: number | string) {
// called union type. a can be of type number or string.
function add(num1, num2) {
    // we need to do different operation based on type. so we use if-else condition code called type guard.
    if (typeof (num1) === 'number' && typeof (num2) === 'number') {
        return num1 + num2;
    }
    else if (typeof (num1) === 'string' && typeof (num2) === 'string') {
        return num1 + "" + num2;
    }
    else {
        return +num1 + +num2; //convert to number if any other type
    }
}
// objects
function printResult(resultObj) {
    console.log(resultObj.val);
}
btn.addEventListener('click', () => {
    const num1 = num1Element.value; // will give error
    // because we can only get value of input types and TS dont know type of num1Element. so we have to tell it
    const num2 = num2Element.value;
    //const result = add(num1, num2); // .value returns a string so it will give error
    // we need to convert it to number
    const result = add(+num1, +num2);
    console.log(result);
    numResults.push(result);
    const stringResult = add(num1, num2);
    console.log(stringResult);
    textResults.push(stringResult);
    printResult({ val: result, timestamp: new Date() }); //type casting - casting result as number
    console.log(numResults); // shows error that type of array is any.
    console.log(textResults);
});
//const myPromise = new Promise((resolve, reject) => {
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("It worked"); // here is resolves a string, so type of promise is string
    }, 1000);
});
myPromise
    .then(res => {
    console.log(res);
    console.log(res.split("w")); // as generic type of promise is string, now we can call string methods on res
})
    .catch(err => console.log(err));
