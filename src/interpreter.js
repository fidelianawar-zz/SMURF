// a Visitor on the AST

function _bool(val) {
    return val ? 1 : 0
}

function checkBinding(val) {
    if(this.binding.has(val)){
        return true;
    }
    else{
        return false;
    }
}


export default class Interpreter {
    constructor(target, printFunction){
        this.target = target;
        this.printFunction = printFunction;
        this.binding = new Map()
    }

    visit(){
        return this.target.accept(this)
    }

    visit(ast) {
        return ast.accept(this)
    }

    visitBinOp(node) {
        let left = node.left.accept(this)
        let right = node.right.accept(this)
        switch (node.op) {
            case"+":
                return left + right
            case"*":
                return left * right
            case"-":
                return left - right
            case"/":
                if((left%right)==0){
                    return parseInt((left/right))
                }
                else{
                    return parseInt(left/right)+1
                }
        }
    }



    visitRelOp(node) {

        let left = node.left.accept(this)
        let right = node.right.accept(this)

        switch (node.op) {
            case"==":
                return _bool(left == right)
            case"!=":
                return _bool(left != right)
            case">":
                return _bool(left > right)
            case">=":
                return _bool(left >= right)
            case"<":
                return _bool(left < right)
            case"<=":
                return _bool(left <= right)
        }
    }

    visitInteger(node) {
        return node.value
    }

    Assignment(node){ 
        let variable = node.variable.accept(this)
        if(this.checkBinding(variable)){
            let expr = node.expr.accept(this)
            this.setVariable(variable, expr)
        }
        else{
            return expr;
        }
    }

    VariableName(node){
        return node.name
    }

    setVariable(name, value){
        let lval = name
        let rval = value
        this.binding.set(lval, rval)
    }

    VariableValue(node){
        return this.getVariable(node.name)
    }

    getVariable(name){
        let lval = name
        this.binding.get(lval)
    }

    FunctionDefinition(node){
        return node.code
    }

    FunctionCall(node){
        let bodyAST = node.name.accept(this)
        //let argsToPass = //not passing arguments right now
        return bodyAST.accept(this)
    }

    Statements(node){
        let value = 0
        for(let statement of node.statements) {
            value = statement.accept(this)
        }
        return value
    }

    // AST IfStatement {
    //     predicate: Integer { value: 1 },
    //     code: Integer { value: 2 },
    //     elseBlock: Integer { value: 3 }
    //   }

    IfStatement(node)
    {
        let condition = node.predicate.accept(this)
        if (condition) {
            return  node.code.accept(this)
        }
        else {
            return node.elseBlock.accept(this)
        }
    }

    VariableDeclaration(node){
        let variable = node.variable.accept(this)
        if(this.checkBinding(variable)){
            let expr = node.expr.accept(this)
            this.setVariable(variable, expr)
        }
        else{
            return expr;
        }
    }

}