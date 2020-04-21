{
  const AST = options.AST
}

identifier
  = identifier:[a-z][a-zA-Z_0-9]*
  { return identifier; }

///////////////////////// blocks (lists of statements) /////////////////////////

code
  = code:(statement)
  { return code; }

statement
  = "let" _ declr: variable_declaration
  { return new AST.Statement(declr)}
  / assignment
  / expr

//////////////// variables & variable declaration /////////////////////////////

variable_declaration
  = _ left:variable_name _ "=" _ right:expr
  { return new AST.Assignment(left,right); }
  / variable_name

variable_value             // as rvalue, should not be able to access a variable w/o let
  = _ id:identifier _ 
  { return new AST.VariableValue(id); }

variable_name              // as lvalue
  = _ id:identifier _
  { return new AST.VariableName(id); }

//////////////////////////////// if/then/else /////////////////////////////

if_expression
  = left:expr code:brace_block "else" else:brace_block
  { 
    console.log("left", left, "code", code, "else", else)
    return new AST.IfStatement(left, code, else) }
  / left:expr code:brace_block
  { return new AST.IfStatement(left, code) }

//////////////////////////////// assignment /////////////////////////////

assignment
  = l:variable_name _ "=" _ r:expr
  { return new AST.Assignment(l,r); }

//////////////////////////////// expression /////////////////////////////
//func call, defn, if_expression, statemetns

expr
  = "fn" _ expr:function_definition
  { return expr; }
  / "if" _ ifExpr: if_expression { return ifExpr; }
  / boolean_expression
  / arithmetic_expression

/////////////////////// boolean expression /////////////////////////////

boolean_expression
  = _ head:arithmetic_expression rest:(relop _ arithmetic_expression)* _
    { return rest.reduce(
        (result, [op, _, right]) => new AST.RelOp(result, op, right),
        head
      )
    }

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
  = _ "(" _ expr:arithmetic_expression _ ")" _
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
   { return; }

brace_block
  = "{" code:code "}"
  { return code;}

//////////////////// spacing /////////////////////////////

eol
  = [\n\r\u2028\u2029]
space
  = [ \t\n\r]
_
  = (space)*
__
  = (space)+