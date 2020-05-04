# Week 2

| Part           | Comments        | Points |
|----------------|-----------------|--------|
| provided tests | All passed      |     65 |
| extras         | 1 failure       |      8 |
| Coding         |                 |     23 |
| **TOTAL**      |                 |     96 |

Really nice.

### Torture tests

The only failure is because the code always evaluates the
then block of an if-statement (sometimes twice):

File: Interpreter.js
091:   IfStatement(node) {
092:
093:     let predicate = bool(node.predicate.accept(this))
094:     let elseCode = node.elseCode.accept(this)
095:
096:     if (predicate == 1){
097:       return node.thenCode.accept(this)
098:     }
099:
100:     //if statement with no else clause and if statement is false, return 0
101:     if(elseCode == null && predicate == 0){
102:       return 0;
103:     }
104:     return node.elseCode.accept(this)
105:   }




# Week 2

| Part           | Comments        | Points |
|----------------|-----------------|--------|
| provided tests | 0,1,2,3 passed  |     44 |
| extras         | 2 failures      |      6 |
| Coding         |                 |     23 |
| **TOTAL**      |                 |     73 |

Test failures:

04 fails:
    - line 102 of ast:            this.predicate = predicatedi
      should be                   this.predicate = predicate

      (although it _really_ should be "name")

    -   = "let" __ declr_statement:variable_declaration _
          { return declr; }

      (the second line should eb declr_statement)

    - it then fails in the interpreter


Failures in my torture tests:

- your binding code doesn't check for duplicate definitions of a
  variable (two `let`s for the same variable)

- your binding code doesn't check for attempts to access a
  variable that hasn't been defined.


# Week 1

| Part           | Comments    | Points |
|----------------|-------------|--------|
| 00-test_values | All passed  |     75 |
| 00-test_extras | All passed  |     10 |
| Coding         |             |     25 |
| **TOTAL**      |             |    100 |

I know you were nervous, but this is really good work. Well done.

(No deduction, but for

                if((left%right)==0){
                    return parseInt((left/right))
                }
                else{
                    return parseInt(left/right)+1
                }

JavaScript has a Math.round() function :)