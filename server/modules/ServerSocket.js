const socketIo = require('socket.io');

class ServerSocket {
    constructor(server) {
        this.socket = socketIo(server);

        let tempID = 0;
        const expressionList = [];

        this.socket.on('connect', connected => {

            connected.emit('list expressions', { expressionList: expressionList });

            connected.on('submit expression', expr => {
                tempID += 1;
                if (expr.operator === 'ADD') {
                    expr = { ...expr, id: tempID, value: Number(expr.arg1) + Number(expr.arg2) };
                } else if (expr.operator === 'SUB') {
                    expr = { ...expr, id: tempID, value: Number(expr.arg1) - Number(expr.arg2) };
                } else if (expr.operator === 'MUL') {
                    expr = { ...expr, id: tempID, value: Number(expr.arg1) * Number(expr.arg2) };
                } else if (expr.operator === 'DIV') {
                    expr = { ...expr, id: tempID, value: Number(expr.arg1) / Number(expr.arg2) };
                }
                expressionList.push(expr);
                connected.emit('list expressions', { expressionList: expressionList });
            });

            connected.on("disconnect", () => console.log("Client disconnected"));
        });

        setInterval(() => this.socket.emit('time', new Date().toTimeString()), 1000);
    }
}

module.exports = ServerSocket;