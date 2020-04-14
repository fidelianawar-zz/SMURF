// This is the top-level of your code. It is responsible for
// parsing a script and then running it. It returns the
// value of the last thing executed in the script.

// It takes three parameters:

// * grammar

//   The compiled version of the PEG.JS grammar. This is automatically
//   generated for you by the smurf.js driver program.

//   You use it by calling

//       grammar.parse(script, options...)

// * script

//   The SMURF source that is to be compiled and run. This is a string.

// * printFunction

//   This is a JavaScript function that your interpreter should use
//   when it executes the SMURF `print` function. You pass it
//   one or more values to display.

//   The default printFunction si mply writes to the console. I also have
//   a version that the tests use so I can capture output.

//update to call pegjs and that will parse the input passed and output the array thing

import Interpreter from "./interpreter.js"
import * as AST from "./ast.js"

export default function compileAndRun(parser, script, printFunction) {

  let ast = parser.parse(script, { AST: AST })
  console.log("AST", ast)
  let interpreter =new Interpreter()
  let result = interpreter.visit(ast)
  console.log("=", result)

  return result // ... the value returned by executing the SMURF script
}



// { const AST = options.AST }

// import fs from "fs"
// import PEGJS from "pegjs"
// import {inspect} from "util"
// import * as AST from"./ast1.js"

// const grammar = fs.readFileSync("expr_ast.pegjs", "utf-8")
// const parser  = PEGJS.generate(grammar)
// let result = parser.parse(process.argv[2], { AST: AST })
// console.log(inspect(result, null, 5, true))