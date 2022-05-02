


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
            var operators = ['+', '-', '*', '%', '/', '**'];
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
        // for prefix
        this.preOrder = function (aNode){
            
            var result = "";
            result += aNode.data + " ";
            if (aNode.lChild != null){
                result += this.preOrder(aNode.lChild).trim() + " ";
            }
            if (aNode.rChild != null){
                result += this.preOrder(aNode.rChild).trim() + " ";
            }
            return result;
        }
        // for postfix
        this.postOrder = function (aNode){
            var result = "";
            if (aNode.lChild != null){
                result += this.postOrder(aNode.lChild).trim() + " ";
            }
            if (aNode.rChild != null){
                result += this.postOrder(aNode.rChild).trim() + " ";
            }
            result += aNode.data + " ";
            return result
        }
    }
}

function Operate(oper1, oper2, token) {
    expr = '( ' + oper1 + " " + token + " " + oper2 + ' )';
    return expr
}

// var tree = new ExpressionTree();
// console.log(eval("( 111 % ( ( ( 2 * 4 ) + 6 ) - -16 ) )"))
// tree.createTree("( 111 % ( ( ( 2 * 4 ) + 6 ) - -16 ) )");
// console.log(tree.postOrder(tree.root))

// postfix to infix converter
function posfToIf (s){
    var operators = ['+', '-', '*', '%', '/', '**'];
    var theStack = new Stack()
    var tokens = s.trim().split(" ")
    //console.log(tokens)
    for (let i = 0; i < tokens.length; i++){
        //theStack.print()
        if (operators.includes(tokens[i])){
            //console.log(tokens[i])
            oper2 = theStack.pop();
            oper1 = theStack.pop();
            theStack.push(Operate(oper1, oper2, tokens[i]));
        } else {
            theStack.push(tokens[i])
        }
    }
    return theStack.pop()
}

// prefix to infix converter
function preftoIf (s){
    var operators = ['+', '-', '*', '%', '/', '//', '**'];
    var theStack = new Stack()
    var tokens = s.split(" ")
    for (let i = tokens.length - 1; i >= 0; i--){
        //theStack.print()
        if (operators.includes(tokens[i])){
            //console.log(tokens[i])
            oper2 = theStack.pop();
            oper1 = theStack.pop();
            theStack.push(Operate(oper2, oper1, tokens[i]));
        } else {
            theStack.push(tokens[i])
        }
    }
    return theStack.pop();
}

//console.log(posfToIf('111 2 4 * 6 + -16 - %'));
//console.log(preftoIf('+ 5  4'))

module.exports = {
    infix : function (s){
        var tree = new ExpressionTree();
        tree.createTree(s);
        prefix = tree.preOrder(tree.root);
        postfix = tree.postOrder(tree.root);
        return {"infix" : s, "prefix" : prefix, "postfix" : postfix, "eval" : eval(s)};
    },
    prefix : function (s){
        infix = preftoIf (s);
        var tree = new ExpressionTree();
        tree.createTree(infix);
        postfix = tree.postOrder(tree.root);
        return {"infix" : infix, "prefix" : s, "postfix" : postfix, "eval" : eval(infix)};
    },
    postfix : function (s){
        infix = posfToIf (s);
        console.log(infix);
        var tree = new ExpressionTree();
        tree.createTree(infix);
        prefix = tree.preOrder(tree.root);
        return {"infix" : infix, "prefix" : prefix, "postfix" :  postfix, "eval" : eval(infix)};
    }
}



