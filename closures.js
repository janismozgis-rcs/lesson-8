import bar from './closure2.js';


const foo = () => {
    console.log('function foo() was called');
}

const number = 123;

bar(number, (someString) => {
    console.log('callback was called');
    console.log('var someString is ' + someString);
    foo();
});