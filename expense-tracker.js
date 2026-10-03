
const fs = require("fs");
if(!fs.existsSync("expenses.json")){
    fs.writeFileSync("expenses.json",JSON.stringify([]));
}
const data = fs.readFileSync("expenses.json","utf8");
const expense = JSON.parse(data);

function addExpense(){
    let description = process.argv[4];
    let amount = Number(process.argv[6]);
    let newId = expense.length+1;
    const d = new Date();
    expense.push({
        id:newId,
        Date:{
            year:  d.getFullYear(),
            month: d.getMonth(),
            day:   d.getDate()
        },
        desc:description,
        amount:amount
    })
    fs.writeFileSync("expenses.json",JSON.stringify(expense,null,2))
    console.log(`Expense added successfully (ID: ${newId})`);
}

function listExpense(){
    console.log("ID    Date        Description    Amount")
    for(const ex of expense){
        console.log(`${ex.id}     ${ex.Date.year}-${ex.Date.month}-${ex.Date.day}   ${ex.desc}    $${ex.amount}`);
    }
}

function deleteExpense(){
    let id = Number(process.argv[4]);
    const newexpense=expense.filter(function(ex){
        return ex.id!=id
    })
    fs.writeFileSync("expenses.json",JSON.stringify(newexpense,null,2));
    console.log("Expense deleted successfully");
}


function summaryExpense(){
    let month = Number(process.argv[4]);
    if(!month){
        let sum=0;
        for(const ex of expense){
            sum+=ex.amount;
        }
         console.log(`Total expenses: $${sum}`);
         return;
    }
    let sum=0;
        for(const ex of expense){
            if(ex.Date.month==month){
                sum+=ex.amount;
            }
            
        }
         console.log(`Total expenses for month:${month} = $${sum}`);
   
}



function operations(){
    let command = process.argv[2];
    switch(command){
        case "add":
            addExpense();
            break;
        case "list":
            listExpense();
            break;
        case "delete":
            deleteExpense();
            break;
        case "summary":
            summaryExpense();
            break;
        default:
            console.log("Wrong Input");
    }
}

operations();