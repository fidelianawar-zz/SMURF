{
  const AST = options.AST
}

arithmetic_expression
  = _ left:mult_term _ op:addop _ right:arithmetic_expression _
  { return left + parseInt(op + right); } / mult_term

mult_term
  = _ left:primary _ op:mulop _ right:mult_term _
    { return  .....BinOp..... }
  / primary

primary
  = _ left:"(" _ options:arithmetic_expression right:")" _
    { return options; }
  / integer


integer
  = '-' number:digits
    { return new AST.Integer(-number) }
  / "+"? number:digits
    { return new AST.Integer(number) }

digits
  = digits:[0-9]*
  { return parseInt(digits.join(""), 10); }

addop
  = op:("+" / "-")
  { return op; }

mulop
  = op:("*" / "/")
  { return op; }

eol
  = [\n\r\u2028\u2029]

space
  = [ \t] / eol

comment
  = "#" (!eol .)*
_
  = (space / comment)*
__
  = (space / comment)+