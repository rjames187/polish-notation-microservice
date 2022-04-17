


class Stack {
    constructor() {
        var collection = [];
        this.print = function () {
            console.log(collection);
        };
        this.push = function (i) {
            collection.push(i);
        };
        this.pop = function () {
            return collection.pop();
        };
        this.peek = function () {
            return collection[collection.length - 1];
        };
        this.isEmpty = function () {
            return collection.length == 0;
        };
        this.clear = function () {
            collection = [];
        };
    }
}

function Operate(oper1, oper2, token) {
    expr = '(' + oper1 + token + oper2 + ')';
    return expr
}

// prefix to infix converter
function pfToIf (s){
    operators = ['+', '-', '*', '%', '/', '//', '**'];
    theStack = new Stack()
    tokens = s.split(" ")
    console.log(tokens)
    for (let i = 0; i < tokens.length; i++){
        theStack.print()
        if (operators.includes(tokens[i])){
            console.log(tokens[i])
            oper2 = theStack.pop();
            oper1 = theStack.pop();
            theStack.push(Operate(oper1, oper2, tokens[i]));
        } else {
            theStack.push(tokens[i])
        }
    }
    return theStack.pop()
}



