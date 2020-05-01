export default class Binding {
  constructor() {

    //top-level binding
    if(this.binding == null){
      this.binding = new Map()
      //how is parent being passed?
    }
    
    else{
      //remember parent
    }

  }

  //creates new Binding who's parent is this binding
  push(){
    return new Binding(this);
  }

  //inside child binding, return parent of this binding
  pop(){
    return this.binding;
  }

  declareVariable(name, value){
    this.binding.name = name;
    this.binding.value = value;
  }

  getVariableValue(name) {
    this.checkVariableExists(name)
    return this.binding.get(name)
  }

  setVariable(name, value) {
    if (this.binding.has(name))
      throw new Error(`Duplicate declaration for variable ${name}`)
    this.binding.set(name, value)
  }

  updateVariable(name, value) {
    this.checkVariableExists(name)
    this.setVariable(name, value)
  }

  checkVariableExists(name) {
    if (!this.binding.has(name))
      throw new Error(`Reference to unknown variable ${name}`)
  }
}