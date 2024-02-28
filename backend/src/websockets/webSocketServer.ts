import { WebSocket, Server as WebSocketServer } from 'ws';

export class WebSocketService {
    private wss: WebSocketServer;

    constructor(port: number) {
        this.wss = new WebSocketServer({ port });
        this.wss.on('connection', (ws) => {
            console.log('WebSocket client connected');
            ws.on('message', (message: string) => {
                console.log('Received message:', message);
            });
            ws.send('Welcome to the WebSocket server!');
        });
        console.log(`WebSocket server started on ws://localhost:${port}`);
    }

    broadcastUpdate(vehicleId: string) {
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    type: 'vehicleUpdate',
                    vehicleId,
                }));
            }
        });
    }
}
