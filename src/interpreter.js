// a Visitor on the AST
export default class Interpreter {
    visit(ast) {
        return ast.accept(this)
    }
    visitBinOp(node) {
        let left = node.left.accept(this)
        let right = node.right.accept(this)
        switch (node.op) {
            case"+":
                return left + right
            case"*":
                return left * right
            case"-":
                return left - right
            case"/":
                if((left%right)==0){
                    return parseInt((left/right))
                }
                else{
                    return parseInt(left/right)+1
                }
        }
    }
    visitInteger(node) {
        return node.value
    }
}