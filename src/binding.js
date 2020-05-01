export default class Binding {

  constructor(parent = null) {
    this.binding = new Map()
    this.parent = parent
  }

  //creates new Binding who's parent is this binding
  push() {
    return new Binding(this);
  }

  //inside child binding, return parent of this binding
  pop() {
   return this.parent
  }

  getVariableValue(name) {
    //check if this variable is in binding
    if (this.checkVariableExists(name)){
      return this.binding.get(name)
    }
    //if its not, check it's parent binding recursively until top is reached
    else if (this.parent != null){
      return this.parent.getVariableValue(name)
    }
    throw new Error("This variable does not exist")
  }


  setVariable(name, value) {
    if (this.binding.has(name))
      throw new Error(`Duplicate declaration for variable ${name}`)
    this.binding.set(name, value)
  }

  updateVariable(name, value) {
    let update = this.getBinding(name)
    update.binding.set(name, value)
  }

  checkVariableExists(name) {
    if (!this.binding.has(name)){
      return false
    }
    return true
  }

  getBinding(name) {
    if (this.checkVariableExists(name)){
      return this
    }
    else if (this.parent != null){
      return this.parent.getBinding(name)
    }
    throw new Error("The variable does not exist in binding")
  }

  

}