{
  const AST = options.AST
}

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
  = _ left: "(" _ op:arithmetic_expression right: _ ")" _
    { return op; }
  / integer

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

eol
  = [\n\r\u2028\u2029]

space
  = [ \t\n\r]

_
  = (space)*