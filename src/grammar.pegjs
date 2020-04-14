{
  const AST = options.AST
}

arithmetic_expression
  = _ head:mult_term _ rest:(addop _ arithmetic_expression)* _
    { return rest.reduce(
            (result, [op, _, right]) => new AST.BinOp(result, op, right),
            head 
        )
    }

mult_term
  = _ head:primary _ mulop rest:mult_term* _
    { return rest.reduce(
            (result, [op, _, right]) => new AST.BinOp(result, op, right),
            head 
    )  
    }
   
primary
  = _ left: "(" _ options:arithmetic_expression right: _ ")" _
    { return options; }
  / integer

integer
  = "-" number:digits
    { return new AST.Integer(-number) }
  / "+"? number:digits
    { return new AST.Integer(number) }

digits
  = digits:[0-9]*
  { return new AST.Integer(parseInt(digits.join(""), 10)); }

addop
  = op:( "+" / "-" )
  { return op; }

mulop
  = op:(  "*" / "/"  )
  { return op; }

eol
  = [\n\r\u2028\u2029]

space
  = [ \t\n\r]

_
  = (space)*