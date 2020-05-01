function bool(value) {
  return value ? 1 : 0
}

const operations = {
  "+": (l, r) => l + r,
  "-": (l, r) => l - r,
  "*": (l, r) => l * r,
  "/": (l, r) => Math.round(l / r),

  "<":  (l,r) => bool(l < r),
  "<=": (l,r) => bool(l <= r),
  "==": (l,r) => bool(l == r),
  ">=": (l,r) => bool(l >= r),
  ">":  (l,r) => bool(l > r),
  "!=": (l,r) => bool(l != r),

}

import Binding from "../binding.js"

export default class Interpreter {

  constructor(target, printFunction) {
    this.target = target
    this.printFunction = printFunction
    this.binding = new Binding()
  }

  visit() {
    return this.target.accept(this)
  }

  Assignment(node) {
    let variable = node.variable.accept(this)
    let expr     = node.expr.accept(this)
    this.binding.updateVariable(variable, expr)
    return expr
  }

  BinOp(node) {
    let l = node.l.accept(this)
    let r = node.r.accept(this)
    return operations[node.op](l, r)
  }

  FunctionCall(node) {

    let thunk = node.name.accept(this) //how does this store the binding?
  
    //create array of same size as node.args
    var argumentList = new Array(node.args.length);

    //verify same length as formals
    if(argumentList.length != node.formals.length){
      console.log("There are not the same number of arguments");
      return;
    }
    
    //convert node.args into a list of values
    for(var i = 0; i < argumentList.length; ++i) {

      //is this the same as node.args.getVariableValue?
      argumentList[i] = node.args[i].accept(this); //visit back each of args to evaluate it
      this.binding = thunk.binding();
      setVariable(node.args[i].name, argumentList[i]);
    
    }
  }

  Thunk(node){
    console.log("inside thunk AST")
    let thunk = node.binding.accept(this)
    let value = getVariableValue(thunk)
    return value
  }

  FunctionDefinition(node) {
    //return node.code
    return new AST.Thunk(node.formals, node.code, this.binding)
  }

  IfStatement(node) {

    let predicate = bool(node.predicate.accept(this))
    let elseCode = node.elseCode.accept(this)
    
    if (predicate == 1){
      return node.thenCode.accept(this)
    }
    
    if(elseCode == null && predicate == 0){
      return 0;
    }

    return node.elseCode.accept(this)
  }

  IntegerValue(node) {
    return node.value
  }

  InternalPrint(node) {
    let args = node.args.map(a => a.accept(this).toString() )
    this.printFunction(args)
    return args
  }

  StatementList(node) {
    let result = 0
    node.statements.forEach(statement =>
      result = statement.accept(this)
    )
    return result
  }

  VariableDeclaration(node) {
    let variable = node.variable.accept(this)
    let initialValue = 0
    if (node.initialValue) {
      initialValue = node.initialValue.accept(this)
    }
    this.binding.setVariable(variable, initialValue)
    return initialValue
  }

  VariableName(node) {
    return node.name
  }

  VariableValue(node) {
    return this.binding.getVariableValue(node.name)
  }
}