// ???
// what is symbol and why in js

// Syntax
// The directive looks like a string: "use strict" // script works the “modern” way.
//  must be at the top
val = 0
val = val || 'empty'; // falsy values [undefined, null, NaN, 0, "" (empty string), and false]
val = val ?? "unknown" //nullish coalescing operator // only null and undefined 0 consider normal in this expression
// High Order Function
const multiplyBy = (num1) => {
  return function (num2) {
    return num1 * num2;
  }
}
const multiplyByTwo = multiplyBy(2);
console.log('multiplyBy => ', multiplyByTwo(4));

function makeCounter(){
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
console.log( );
console.log( counter() );
console.log( counter() );
console.log( counter() );

// function f() {
//   let value = Math.random();

//   function g() {
//     debugger; // V8 specific issue 
//   }
//   return g;
// }
// let g = f();
// g();

// ========================================= Task

const pass = 'zair';
const num = 2;


if(pass == '1234'){
  console.log('Password is correct')
}else{
  console.log('password is incorrect')
}

console.log( num % 2 == 0 ? 'Number is Even' : 'Number is odd')

let day;
switch (new Date().getDay()) {
  case 0:
    
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
    day = "Tuesday";
    break;
  default:
    day = "we not deal on those days"
}
console.log(day)

// immediately invoke function expression 

const pro = new Promise((res, rej) => {
  const number = 2;
  number === 2 ? res("number is 2") : rej("number is not 2")
})

const pro2 = new Promise((res, rej) => {
  const number = 3;
  setTimeout(() => {
    number === 2 ? res("number is 2") : rej("number is not 2")
  }, 3000)
})

console.log(pro)

pro2.then((value) => {
  console.log('pro 2 value in then ', value)
}).catch((error) => {
  console.log('pro 2 error in catch ', error)
})

pro.then((value) => {
  console.log('value in then ', value)
}).catch((error) => {
  console.log('error in catch ', error)
})

const main = async () => {
  await pro2.then((value) => {
    console.log('pro 2 value in then ', value)
  }).catch((error) => {
    console.log('pro 2 error in catch ', error)
  })

  await pro.then((value) => {
    console.log('value in then ', value)
  }).catch((error) => {
    console.log('margaret atwood said: the desire to be loved is the last illusion, Give it up and you will be free ', error)
  })
}

main()

new Date().toString()

// shallow copy # do problem in nested objects to solve this you use deep copy
let person =  {name:'john'}
let newPerson = Object.assign({}, person) 

let person1 =  {name:'john'}
let newPerson1 = {...person1}

console.log(person)

// Deep Copy

let addressObject = { city: 'delhi', state: 'delhi' }

let person2 = {
  name: 'John',
  address: addressObject
};

let str = JSON.stringify(person2)
let jsonObject = JSON.parse(str);

// or use structuredClone : Browser API which work even for circular references (but functions not supported)
let newPerson2 = structuredClone(person);