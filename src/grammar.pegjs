export class BinOp {
    constructor(l, op, r) {
        this.left = l
        this.op = op
        this.right = r
    }
    accept(visitor) {
        return visitor.visitBinOp(this)
    }
}

export class RelOp {
    constructor(l, op, r) {
        this.left = l
        this.op = op
        this.right = r
    }
    accept(visitor) {
        return visitor.visitRelOp(this)
    }
}

export class Integer {
    constructor(value) {
        this.value = value
    }
    accept(visitor) {
        return visitor.visitInteger(this)
    }
}

export class Assignment {
    constructor(l, r) {
        this.variable = l
        this.expr = r
    }
    accept(visitor) {
        return visitor.Assignment(this)
    }
}

export class VariableName {
    constructor(name) {
        this.name = name
    }
    accept(visitor){
        return visitor.VariableName(this)
    }
}

export class VariableValue {
    constructor(name) {
        this.name = name
    }
    accept(visitor){
        return visitor.VariableValue(this)
    }
}

export class FunctionDefinition {
    constructor(name) {
        this.name = name
    }
    accept(visitor){
        return visitor.VariableValue(this)
    }
}
//export const FunctionDefinition = makeNode("FunctionDefinition", "formals", "code")

export class FunctionCall {
    constructor(name, args) {
        this.name = name
        this.args = args
    }
    accept(visitor){
        return visitor.FunctionCall(this)
    }
}

export class Statement {
    constructor(name) {
        this.name = name
    }
    accept(visitor){
        return visitor.Statement(this)
    }
}

export class Statements {
    constructor(statements) {
        this.statements = statements
    }
    accept(visitor){
        return visitor.Statements(this)
    }
}

export class IfStatement {
    constructor(predicate, code, elseBlock) {
        this.predicate = predicate
        this.code = code
        this.elseBlock = elseBlock
    }
    accept(visitor){
        return visitor.IfStatement(this)
    }
}