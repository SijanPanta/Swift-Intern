const user = {
  name: "Sijan",
  age: 20,
  contact: {
    email: "sijan@example.com",
    phone: "9800000000"
  }
};

// a) Destructure name and email into variables
const { name, contact: { email } } = user;
// b) Update phone number to "9811111111"
user.contact.phone="9811111111";
// c) Add a new property: address = "Kathmandu"
user.address = "Kathmandu";

//------------------------------------------------------------------------

const key = "score";
let student = { name: "Rita" };

// a) Add dynamic key-value: student[key] = 95
student[key] = 95;

console.log(student.name)

//----------------------------------------------------------------------
let transactions = [
  {amount: 100, type: "deposit"},
  {amount: 50, type: "withdraw"},
  {amount: 200, type: "deposit"}
];

// a) Total deposits
const totalDeposits = transactions
  .filter(t => t.type === "deposit")
  .reduce((sum, t) => sum + t.amount, 0);

console.log("Total Deposits:", totalDeposits);
// b) Total withdrawals
const totalWithdrawls=transactions
  .filter(a=>a.type==="withdraw")
  .reduce((sum,a)=>sum+a.amount,0);

  console.log("total Withdrawl: "+totalWithdrawls)
