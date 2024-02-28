import mongoose, { Document, Schema } from 'mongoose';
import { IVehicle } from '@tenderd/shared/interfaces/vehicle.interface';
import { VehicleStatus } from '@tenderd/shared/enums/vehicle-status.enum';

export interface VehicleDocument extends Omit<IVehicle, '_id'>, Document {}

const vehicleSchema: Schema<VehicleDocument> = new mongoose.Schema({
    make: { type: String, required: true },
    year: { type: Number, required: true },
    status: { type: String, enum: Object.values(VehicleStatus), required: true },
    speed: Number,
    location: {
        latitude: Number,
        longitude: Number,
    },
    maintenanceRecords: [{
        date: Date,
        description: String,
        cost: Number,
    }],
    usageStats: {
        hoursOperated: Number,
        distanceTraveled: Number,
    },
}, { timestamps: true });

export const Vehicle = mongoose.model<VehicleDocument>('Vehicle', vehicleSchema);
