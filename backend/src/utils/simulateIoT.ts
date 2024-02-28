// simulateIotData.ts
import mongoose from 'mongoose';
import { Vehicle } from '../models/vehicle.model';
import { WebSocketService } from '../websockets/webSocketServer';

async function updateRandomVehicle(webSocketService: WebSocketService) {
    // Fetch the count of all vehicles in the database
    const count = await Vehicle.countDocuments(); // Adjusted to use countDocuments
    if (count === 0) return; // Exit if there are no vehicles

    const random = Math.floor(Math.random() * count);
    const randomVehicle = await Vehicle.findOne().skip(random);

    if (!randomVehicle) return;

    // Provide default values if usageStats or its properties are undefined
    const currentHoursOperated = randomVehicle.usageStats?.hoursOperated ?? 0;
    const currentDistanceTraveled = randomVehicle.usageStats?.distanceTraveled ?? 0;

    // Simulate data changes
    const speed = Math.floor(Math.random() * 100); // Random speed between 0 and 100
    const latitude = Math.random() * (90 - (-90)) + (-90); // Random latitude
    const longitude = Math.random() * (180 - (-180)) + (-180); // Random longitude
    const hoursOperated = currentHoursOperated + 0.1; // Increment hours operated
    const distanceTraveled = currentDistanceTraveled + Math.random() * 10; // Increment distance

    console.log('your speed: ', speed, randomVehicle._id);

    // Update the vehicle with new simulated data
    await Vehicle.updateOne({ _id: randomVehicle._id }, {
        $set: {
            "speed": speed,
            "location.latitude": latitude,
            "location.longitude": longitude,
            "usageStats.hoursOperated": hoursOperated,
            "usageStats.distanceTraveled": distanceTraveled
        }
    });
    webSocketService.broadcastUpdate(randomVehicle._id.toString());
}

function startIotSimulation(webSocketService: WebSocketService) {
    // Function to start the simulation
    const startSimulation = () => {
        console.log('Starting IoT simulation.');
        setInterval(() => updateRandomVehicle(webSocketService), 5000);
    };

    // Check if the MongoDB connection is already open
    if (mongoose.connection.readyState === 1) {
        startSimulation();
    } else {
        // If the connection is not yet open, wait for it to open
        mongoose.connection.once('open', startSimulation);
    }
}


export default startIotSimulation;
