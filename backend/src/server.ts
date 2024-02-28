import express from 'express';
import vehicleRoutes from './routes/vehicle.routes';
import connectDatabase from './db';
import cors from 'cors';
import { WebSocketService } from './websockets/webSocketServer';
import startIotSimulation from './utils/simulateIoT';
import { setupSwagger } from './utils/swagger';

// Initialize express
const app = express();

// Body parser middleware
app.use(express.json());

// Add cors for dev use only
app.use(cors());

// API docs
setupSwagger(app);

// Include routes
app.use('/vehicles', vehicleRoutes);

// Define the port
const PORT = process.env.PORT || 4040;
const wsPort = 8080;

// Start the server
app.listen(PORT, async () => {
    await connectDatabase();
    const webSocketService = new WebSocketService(wsPort);
    startIotSimulation(webSocketService); // Pass the WebSocketService instance
    console.log(`Server is running on port: ${PORT}`);
});
