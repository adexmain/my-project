
    const name = 'John';
    const age = 30;

    console.log(`my name is${name} and I am ${age}`);

    //FUNCTION

    function myFunction() {
        console.log('This is a function');

    }

    function add(a, b) {
        return a + b;
    }

    const result = add(5, 10);
    console.log(result);

    function multiply(a, b) {
        return a * b;
    }

    const num1 = 4;
    const num2 =
        (2, 5);

    console.log(multiply(num1, num2));

    function checkAge(age) {
        if (age >= 18) {
            return "Adult";
        } else {
            return "Minor";
        }
    }

    const age1 = 20;
    const age2 = 15;
    const age3 = 18;

    console.log(checkAge(age1)); // Output: Adult
    console.log(checkAge(age2)); // Output: Minor
    console.log(checkAge(age3)); // Output: Adult

    let driveAge = 16;
    let country = "USA";
    let text = "You can Not drive!";

    if (country == "USA") {
        if (driveAge >= 16) {
            text = "You can drive!";
        }
    }
    console.log(text); // Output: You can drive!

    function displayuserName(name) {
        console.log(`Hello, ${name}!`);
    }
    const userName = "Alice";
    displayuserName(userName); // Output: Hello, Alice!


    //OBJECT(Groups multiple values together)
    const product = {
        name: 'Laptop',
        price: 1090,
        'delivery-time': '1 day',
        rating: {
            stars: 4.5,
            count: 87
        },
        fun: function function1() {
            console.log('function inside object')
        }
    };
    console.log(product);
    console.log(product.name); // Output: Laptop  
    console.log(product.price); // Output: 1090 
    console.log(product['delivery-time']);

    console.log(product.rating.count);
    product.fun();

    //JSON AND LOCAL STORAGE
    console.log(JSON.stringify(product)); //convert our object to JSON

    const jsonString = JSON.stringify(product)
    console.log(JSON.parse(jsonString)); // convert back to Javascript

    localStorage.setItem('message', 'hello');

    console.log(localStorage.getItem('message'));

    //AUTO-BOXING

    console.log('hello'.length);
    console.log('hello'.toUpperCase());

    //DOM - Document Object Model (combines JS & html together)
    console.log(document.body.innerHTML);

    console.log(document.querySelector('button').innerHTML);

    document.querySelector('button')
        .innerHTML = 'changed';

    const buttonElement = document.querySelector('.js-button')
        .innerHTML = 'Login';
    console.log(buttonElement);

    /*

    document.body.innerHTML = 'hello';
    document.body.innerHTML = '<button>Good Job!</button>';
    document.title = 'Learn DOM!';
    */

    //ARRAY(list of values) AND LOOPS

    const myArray = [10, 20, 30];
    console.log(myArray);

    console.log(myArray[1]);
    myArray[0] = 99;
    console.log(myArray);


    //LOOPING THROUGH AN ARRAY
    const todoList = [
        'make dinner',
        'wash dishes',
        'watch youtube'
    ];

    for (let i = 0; i <= todoList.length; i++) {
        const value = todoList[i];
        console.log(value);
    }
    //accumulator method
    const nums = [1, 1, 3];
    let total = 0;

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        total += num;
    }
    console.log(total);

    //break and continue loop

    for (let i = 0; i < 10; i++) {
        if (i === 5) {
            break; // Exit the loop when i is 5
        }
        console.log(i);
    }
    //continue example
    for (let i = 0; i < 10; i++) {
        if (i === 5) {
            continue; // Skip the rest of the loop when i is 5
        }
        console.log(i);
    }
    //while loop
    let i= 1;

    while (i <= 10) {
        if (i % 3 === 0) {
            i++;
            continue; // Skip the rest of the loop when i is divisible by 3
        }
        console.log(i);
        i++;
    }
        //using loop inside a function, return can be used to break out of the function and stop the loop
    function doubleArray (nums) {
        const numsDoubled = [];
        for (let i = 0; i < nums.length; i++) {
            const num = nums[i];
            if (num === 0) {
                numsDoubled.push(num * 2);
            }
        }
    return numsDoubled;
    }
    console.log(doubleArray([1, 1, 3]));
    console.log(doubleArray([2, 2, 5, 0, 5]));

    //advanced function

    function greetings() {
        console.log('Hello, World!');
    }
    greetings(); // Output: Hello, World!

    const function1 = function greetings() {
        console.log('Hello, World2!');
    };
    
    console.log(function1); // Output: [Function: greetings]

    //advanced function with parameters - set time-out function
            setTimeout(function() {
                console.log('timeout function executed after 3 seconds');
            }, 3000);

            console.log('next line');

            setInterval(function() {
                console.log('interval');
                    }, 2000);
        
//forEach method - loops through an array and executes a function for each element in the array
[
   'make dinner',
   'wash dishes',
   'watch youtube'
]. forEach(function(value, index) {
    console.log(value);
    console.log(index);
});

//arrow function - a shorter way to write a function




