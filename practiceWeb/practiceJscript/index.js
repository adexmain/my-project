// varibale

let age = 25;
let price = 10.99;
let gpa = 2.1;

console.log(typeof age);

console.log(`You are ${age} years old`)

console.log(`The price of my product is $${price}`)
console.log(`Your gpa is ${gpa}`)


//    STRING

let firstName = "Adeolu";
let favoriteFood = "Pizza";
let email = "akin123@gmail.com";

console.log(typeof "Adeolu");
console.log(`My name is ${firstName}`);

console.log(`You like ${favoriteFood} as your lunch meal`);

console.log(`For further inquires send details to ${email}`);


// //BOOLEAN
let online = false;
let forSale = true;

console.log(`Adeolu is online: ${online}`);
console.log(`Is this car for sale: ${forSale}`)


// HOW TO USE VARIABLE TO DISPLAY INFORMATION 
let fullName = "Adeolu Akinpelu";
let age = "30";
let isStudent = "true";

document.getElementById("p1").textContent = `My name is ${fullName}`;

document.getElementById("p2").textContent = `I'm ${age} years old`;

document.getElementById("p3").textContent = `Enrolled as a student: ${isStudent}`


// learning basic arithmetic operator in javascript//

/*
operator precedence
1. parenthesis ()
2. exponents
3. multipliccation & division & modulo 
4. addition & subtraction
*/

let students = 31;

students +=1;
students -=1;
students *=2;
students /=2;
students **= 2;
students %= 2;
// students++; increase by 1
// students--; decrease by 1
 
console.log(students);

let result = 1 + 2 * 3 + 16;

let result = 6 / 2 ** (2 + 5);

console.log(result);


//how to accept user-input 1
let username;

document.getElementById("mySubmit").onclick = function(){
  username = document.getElementById("myText").value;
  console.log(username);
}

//how to accept user-input 2

let username;

document.getElementById("mySubmit").onclick = function(){
  username = document.getElementById("myText").value;
  document.getElementById("myH1").textContent = `Hello ${username}`
}

let age = window.prompt("How old are you?")

age = Number(age);
age+=1;

console.log(age, typeof age);



//CONST = a variable that can't be changed/ circumference of a circle

const PI = 3.14159;
let radius;
let circumference;

document.getElementById("mySubmit").addEventListener("click", function(){
  radius = document.getElementById("myText").value;
  radius = Number(radius);
  circumference = 2 * PI * radius;
  document.getElementById("myH3").textContent = circumference + "cm";

})


//random number generation

const myButton = document.getElementById("myButton");
const label1 = document.getElementById("label1");
const label2 = document.getElementById("label2");
const label3 = document.getElementById("label3");
const min = 1;
const max = 6;
let randomNum1;
let randomNum2;
let randomNum3;

myButton.addEventListener("click", function(){
  randomNum1 = Math.floor(Math.random() * max) + min;
  randomNum2 = Math.floor(Math.random() * max) + min;
  randomNum3 = Math.floor(Math.random() * max) + min;
  label1.textContent = randomNum1;
  label2.textContent = randomNum2;
  label3.textContent = randomNum3;

})

