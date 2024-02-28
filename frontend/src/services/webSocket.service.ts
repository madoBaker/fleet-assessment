import { fetchVehicleById } from '../features/vehicles.thunks';
import { store } from '../app/store';

type MessageHandler = (data: any) => void;

export class WebSocketService {
    private socket: WebSocket | null = null;
    private messageHandler?: MessageHandler;

    public connect(url: string): void {
        this.socket = new WebSocket(url);
        this.socket.onopen = () => console.log('WebSocket Connected');
        this.socket.onclose = () => console.log('WebSocket Disconnected');
        this.socket.onmessage = (event) => {
            let message = {type: '', vehicleId: ''};
            if (event.data[0] === '{') {
                message = JSON.parse(event.data);
            }


            if (message.type === 'vehicleUpdate') {
                // Fetch the latest data for the updated vehicle
                store.dispatch(fetchVehicleById(message.vehicleId));
            }
        };
    }

    public onMessage(handler: MessageHandler): void {
        this.messageHandler = handler;
    }

    public sendMessage(message: Object): void {
        if (this.socket?.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        }
    }
}

export const wsService = new WebSocketService();
