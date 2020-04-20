{
  const AST = options.AST
}

identifier
  = identifier:[a-z][a-zA-Z_0-9]*
  { return identifier; }

//////////////// variables & variable declaration /////////////////////////////

variable_declaration
  = _ left:variable_name _ "=" _ right:expr
  / variable_name

variable_value             // as rvalue
  = _ id:identifier _ 
  { return new AST.VariableValue(id); }

variable_name              // as lvalue
  = _ id:identifier _
  { return new AST.VariableName(id); }

//////////////////////////////// assignment /////////////////////////////

assignment
  = l:variable_name _ "=" _ r:expr
  { return new AST.Assignment(l,r); }

//////////////////// arithmetic expression /////////////////////////////

arithmetic_expression
  = _ head:mult_term _ rest:(addop _ mult_term)* _
    { return rest.reduce(
            (result, [op, _, right]) => new AST.BinOp(result, op, right),
            head
      )
    }

mult_term
  = _ head:primary _ rest:(_ mulop _ primary)* _
    { return rest.reduce(
            (result, [_, op, __, right]) => new AST.BinOp(result, op, right),
            head 
      )  
    }

primary
  = _ left: "(" _ expr:arithmetic_expression right: _ ")" _
    { return expr; }
  / integer / function_call / variable_value

integer
  = "-" number:digits
    { return new AST.Integer(-number) }
  / "+"? number:digits
    { return new AST.Integer(number) }

digits
  = digits:[0-9]*
  { return parseInt(digits.join(""), 10); }

addop
  = op:( "+" / "-" )
  { return op; }

mulop
  = op:(  "*" / "/"  )
  { return op; }

relop
  = op:('==' / '!=' / '>=' / '>' / '<=' / '<')
    { return op; }

//////////////////////////////// function call /////////////////////////////

function_call
  = name:variable_value "(" _ ")"     // note: no parameters
  { return new AST.FunctionCall(name,args); }

//////////////////////// function definition /////////////////////////////

function_definition
  = params:param_list _ code:brace_block
  { return new AST.FunctionDefinition(params,code) }

param_list
   = "(" ")"

brace_block
  = "{" code "}"

//////////////////// spacing /////////////////////////////

eol
  = [\n\r\u2028\u2029]

space
  = [ \t\n\r]
_
  = (space)*