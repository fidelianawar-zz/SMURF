// a Visitor on the AST
export default class Interpreter {

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
                if(left == right)
                    return true
            case"!=":
                if(left != right)
                    return true
            case"!=":
                if(left >= right)
                    return true
            case">":
                if(left > right)
                    return true
            case"<=":
                if(left <= right)
                    return true
            case"<":
                if(left < right)
                    return true
        }
    }
    
    visitInteger(node) {
        return node.value
    }

    constructor(target, printFunction){
        this.target = target;
        this.binding = new Map()
    }

    Assignment(node){
        let variable = node.variable.accept(this)
        let expr = node.expr.accept(this)
        this.setVariable(variable, expr)
        return expr
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
}