


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

class Node {
    constructor (data = null, lChild = null, rChild = null){
        this.data = data;
        this.lChild = lChild;
        this.rChild = rChild;

    }
}

class ExpressionTree {
    constructor () {
        this.root = null;

        this.createTree = function (expr) {
            var operators = ['+', '-', '*', '%', '/', '//', '**'];
            var expr = expr.split(" ");
            var stack = new Stack();
            var curNode = new Node();

            for (let curToken = 0; curToken < expr.length; curToken++){
                //console.log(expr[curToken]);
                if (expr[curToken] == '('){
                    curNode.lChild = new Node();
                    stack.push(curNode);
                    curNode = curNode.lChild;
                } else if (operators.includes(expr[curToken])){
                    curNode.data = expr[curToken];
                    stack.push(curNode);
                    curNode.rChild = new Node();
                    curNode = curNode.rChild;
                } else if (expr[curToken] == ')'){
                    if (!stack.isEmpty()){
                        curNode = stack.pop();
                    }
                } else {
                    curNode.data = expr[curToken];
                    curNode = stack.pop();
                }
            }

            this.root = curNode
        }

        this.preOrder = function (aNode){
            
            var result = "";
            result += aNode.data + " ";
            if (aNode.lChild != null){
                result += this.preOrder(aNode.lChild) + " ";
            }
            if (aNode.rChild != null){
                result += this.preOrder(aNode.rChild) + " ";
            }
            return result;
        }
    }
}

function Operate(oper1, oper2, token) {
    expr = '(' + oper1 + token + oper2 + ')';
    return expr
}

var tree = new ExpressionTree();
tree.createTree("( 111 % ( ( ( 2 * 4 ) + 6 ) - -16 ) )");
console.log(tree.preOrder(tree.root))


module.exports = {
// prefix to infix converter
    posfToIf : function (s){
        var operators = ['+', '-', '*', '%', '/', '//', '**'];
        var theStack = new Stack()
        var tokens = s.split(" ")
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
}



