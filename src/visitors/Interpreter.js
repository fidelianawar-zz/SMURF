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
import * as AST from "../ast.js"

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

    let thunk = node.name.accept(this)
    let thunkBinding = thunk.binding.push()

    if (node.args.length > 0) { //there are arguments

      //check to see if params length is = to argument length
      if (thunk.formals.length != node.args.length) {
        throw new Error("There are not the same number of arguments")
      }

      //convert params into list
      thunk.formals.forEach((param, i) => {
        thunk.formals[i] = param[2].accept(this)
      })
 
      //convert node.args into a list of values
      node.args.forEach((argument, i) => {
        node.args[i] = argument[2].accept(this) //arg[2] is the argument w/o comma & _
      })

      //set new binding for each variable
      thunk.formals.forEach((formal,i) => {
        thunkBinding.setVariable(formal, node.args[i])
      })
    }

    this.binding = thunkBinding
    let thunkCode = thunk.code.accept(this)

    while (this.binding.parent != null) {
      this.binding = this.binding.pop() //go "up" the tree of binding
    }

    return thunkCode

  }

  FunctionDefinition(node) {
    return new AST.Thunk(node.formals, node.code, this.binding)
  }

  IfStatement(node) {

    let predicate = bool(node.predicate.accept(this))
    let elseCode = node.elseCode.accept(this)
    
    if (predicate == 1){
      return node.thenCode.accept(this)
    }
    
    //if statement with no else clause and if statement is false, return 0
    if(elseCode == null && predicate == 0){
      return 0;
    }

    return node.elseCode.accept(this)
  }

  IntegerValue(node) {
    return node.value
  }

  InternalPrint(node) {
    let args = node.args.map(a => a[2].accept(this).toString() )
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