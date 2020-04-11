arithmetic_expression
  = _ left:mult_term _ op:addop _ right:arithmetic_expression _
  { return left + parseInt(op + right); } / mult_term

mult_term
  = _ left:primary _ op:mulop _ right:mult_term _
  { return (op = '*') ? left*right : left/right } / primary 

primary
  = _ left:"(" _ options:arithmetic_expression right:")" _
  { return options; } / integer
  
 
integer
  = sign:('+' / '-') right:digits
	{ return (sign == '+' ? digits : -digits); } /digits

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