const pool = require('../modules/pool');

class DatabaseClient {
    async insertExpression(expr) {
        const insertSQL = `
        INSERT
            INTO calc_history
            (arg1, arg2, operator_string, ans)
            VALUES
            ($1, $2, $3, $4);
        `;
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            await client.query(insertSQL, [expr.arg1, expr.arg2, expr.operator, expr.ans]);
            await client.query('COMMIT');
        } catch (queryError) {
            await client('ROLLBACK');
            const errorMessage = `SQL error using 'insertExpression()', ${queryError}`;
            await console.log(errorMessage);
            throw new Error(errorMessage);
        }
    }

    async getExpressions() {
        const selectSQL = `
        SELECT
            id
            , arg1
            , arg2
            , operator_string AS operator
            , ans
            , submit_timestamp AS time
        FROM calc_history
        ORDER BY submit_timestamp DESC
        LIMIT 10;
        `;
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const { rows } = await client.query(selectSQL);
            await client.query('COMMIT');
            return rows;
        } catch(queryError) {
            await client('ROLLBACK');
            const errorMessage = `SQL error using 'getExpressions()', ${queryError}`;
            await console.log(errorMessage);
            throw new Error(errorMessage);
        } finally {
            client.release();
        }
    }

    async deleteExpression(expr) {
        const id = expr.id;
        const deleteSQL = `
        DELETE
            FROM calc_history
            WHERE id = $1;
        `;
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            await client.query(deleteSQL, [id]);
            await client.query('COMMIT');
        } catch (queryError) {
            await client('ROLLBACK');
            const errorMessage = `SQL error using 'deleteExpression()', ${queryError}`;
            await console.log(errorMessage);
            throw new Error(errorMessage);
        } finally {
            client.release();
        }
    }
}

module.exports = DatabaseClient;