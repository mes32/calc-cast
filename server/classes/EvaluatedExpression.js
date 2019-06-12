
class EvaluatedExpression {
    constructor(expr) {
        this.arg1 = expr.arg1;
        this.arg2 = expr.arg2;
        this.operator = expr.operator;

        if (expr.operator === 'ADD') {
            this.ans = Number(expr.arg1) + Number(expr.arg2);
        } else if (expr.operator === 'SUB') {
            this.ans = Number(expr.arg1) - Number(expr.arg2);
        } else if (expr.operator === 'MUL') {
            this.ans = Number(expr.arg1) * Number(expr.arg2);
        } else if (expr.operator === 'DIV') {
            this.ans = Number(expr.arg1) / Number(expr.arg2);
        }
    }
}

module.exports = EvaluatedExpression;