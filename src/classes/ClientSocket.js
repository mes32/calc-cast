import io from 'socket.io-client';

class ClientSocket {
    constructor(app) {
        this.socket = io();

        this.socket.on('list expressions', response => {
            app.updateExpressionList(response.expressionList);
        });

        this.socket.on('time', time => {
            app.updateTime(String(time));
        });
    }

    emitExpression = (expr) => {
        this.socket.emit('submit expression', expr);
    }
}

export default ClientSocket;