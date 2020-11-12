const bar = (num, fooCallback) => {

    fooCallback('fizzbazz');

    console.log('function bar() was called');
    console.log('in function bar(), var num is ' + num);
    console.log(typeof fooCallback)

}

export default bar;