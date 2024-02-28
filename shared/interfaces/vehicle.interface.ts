import { VehicleStatus } from '../enums/vehicle-status.enum';

export interface IVehicle {
    _id?: string; // MongoDB unique ID
    make: string;
    year: number;
    status: VehicleStatus;
    speed?: number;
    timeTillMaintenance?: number;
    location?: {
        latitude: number;
        longitude: number;
    }; // Optional for tracking
    maintenanceRecords?: Array<{
        date: Date;
        description: string;
        cost?: number;
    }>; // Optional for logging maintenance
    usageStats?: {
        hoursOperated: number;
        distanceTraveled: number;
    }; // Optional for analytics
    updatedAt?: Date;
}
