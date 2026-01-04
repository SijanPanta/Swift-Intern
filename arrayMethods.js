

//work-1
let fruits = ["apple", "banana", "mango"];
// a) Add "orange" to the end
// b) Remove the first element
// c) Add "grapes" to the start
// d) Replace "banana" with "kiwi"
console.log("Work-1");
fruits.push("orange");
fruits.shift();
fruits.unshift("grape");
console.log(fruits)
fruits.splice(1,1,"kiwi")
console.log(fruits)

//work-2
let numbers = [10, 20, 30, 40, 50];
// a) Create a new array with 20,30,40 using slice
// b) Remove 30 and add 35 at its place using splice
console.log("Work-2")
const sliceNum=numbers.slice(1,4);
console.log(sliceNum)

numbers.splice(2,1,35);
console.log(numbers)

//work-3
let marks = [45, 67, 89, 34, 78];
// a) Create an array of marks multiplied by 2
// b) Filter out marks greater than 50
// c) Calculate the total sum of all marks
console.log("work-3")
   const multipliedArr=marks.map(num=>num*2);
   console.log(multipliedArr);

   const filterArr=marks.filter(marks=>marks>50);
   console.log(filterArr);

   const sumMarks=marks.reduce((sum,marks)=>sum+marks)
   console.log(sumMarks);

   //work-4
   let users = [
    {name: "Sijan", age: 20},
    {name: "Rita", age: 22},
    {name: "John", age: 19}
];
// a) Find the first user older than 20
// b) Check if there is a user named "John"
console.log("Work-4");
const findUsr=users.find(user=>user.age>20);
console.log(findUsr);

console.log(users.some(users=>users.name==="John"))

//work-5
let colors = ["red", "green", "blue"];
// Print each color in uppercase using forEach
console.log("Work-5")
colors.forEach(e => {
    console.log(e.toUpperCase())
});

//work-6
let students = [
  {name: "Sijan", score: 90},
  {name: "Rita", score: 80},
  {name: "John", score: 70}
];
// Expected output: ["Sijan", "Rita", "John"]
console.log("Work-6");
const nameArr=students.map(e=>e.name);
console.log(nameArr)

//work-7
let nums = [1,2,2,3,5,5,6];
// Expected output: [1,2,3,4,5]
console.log("work-7");
const uniqueNums = nums.filter((num, index) => nums.indexOf(num) === index);
console.log(uniqueNums);

//work-8
let data = [1,2,3,4,5,6];
// Example task: get the sum of all even numbers multiplied by 2
console.log("work-8")
const modifiedData=data.filter(num=>num % 2==0).map(num=>num*2).reduce((sum,num)=>sum+num,0);
console.log(modifiedData);