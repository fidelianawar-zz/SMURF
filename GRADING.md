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