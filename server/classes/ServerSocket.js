const socketIo = require('socket.io');
const DatabaseClient = require('../classes/DatabaseClient');
const EvaluatedExpression = require('../classes/EvaluatedExpression');

class ServerSocket {
    constructor(server) {
        this.socket = socketIo(server);
        this.database = new DatabaseClient();

        this.socket.on('connect', clientSocket => {
            console.log('New client connected');

            this.emitExpressions(clientSocket);

            clientSocket.on('submit expression', expr => {
                const evaluatedExpr = new EvaluatedExpression(expr);
                this.database.insertExpression(evaluatedExpr).then(() => {
                    this.emitExpressions(this.socket);
                });
            });

            clientSocket.on('delete expression', expr => {
                this.database.deleteExpression(expr).then(() => {
                    this.emitExpressions(this.socket);
                });
            });

            clientSocket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });

        // Emit current datetime at 1 sec intervals
        setInterval(() => this.emitTime(this.socket), 1000);
    }

    emitTime(connection) {
        connection.emit('time', new Date().toUTCString());
    }

    async emitExpressions(connection) {
        const expressions = await this.database.getExpressions();
        await connection.emit('list expressions', expressions);
    }
}

module.exports = ServerSocket;