const socketIo = require('socket.io');
const DatabaseClient = require('../classes/DatabaseClient');
const EvaluatedExpression = require('../classes/EvaluatedExpression');

class ServerSocket {
    constructor(server) {
        this.socket = socketIo(server);

        let tempID = 0;
        const expressionList = [];
        const database = new DatabaseClient();

        this.socket.on('connect', clientSocket => {
            console.log('New client connected');

            this.emitExpressions(clientSocket, expressionList);

            clientSocket.on('submit expression', expr => {
                tempID += 1;
                const evaluatedExpr = new EvaluatedExpression(expr);
                expr = { ...expr, id: tempID, value: evaluatedExpr.ans };
                expressionList.push(expr);
                this.emitExpressions(clientSocket, expressionList);
            });

            // Console log when clients disconnect
            clientSocket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });

        // Emit the current date at 1 sec intervals
        setInterval(() => this.emitTime(this.socket), 1000);
    }

    emitTime(connection) {
        connection.emit('time', new Date().toTimeString());
    }

    emitExpressions(connection, expressionList) {
        connection.emit('list expressions', { expressionList: expressionList });
    }
}

module.exports = ServerSocket;