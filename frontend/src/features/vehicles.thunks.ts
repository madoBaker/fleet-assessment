import { createAsyncThunk } from '@reduxjs/toolkit';
import { vehicleService } from '../services/vehicle.service';
import { IVehicle } from '@tenderd/shared/interfaces/vehicle.interface';

// Fetch all vehicles
export const fetchVehicles = createAsyncThunk(
    'vehicles/fetchAll', async (): Promise<IVehicle[]> => {
    return await vehicleService.getAllVehicles();
});

// Register a new vehicle
export const registerVehicle = createAsyncThunk(
    'vehicles/register', async (vehicleData: IVehicle) => {
        return await vehicleService.createVehicle(vehicleData);
    });

// Update vehicle
export const updateVehicle = createAsyncThunk(
    'vehicles/update',
    async (vehicle: IVehicle) => {
        return await vehicleService.updateVehicle(vehicle);
    });

// fetch vehicle updates by ID
export const fetchVehicleById = createAsyncThunk(
    'vehicles/fetchById',
    async (id: string) => {
        return await vehicleService.getVehicleById(id);
    });


// Delete vehicle
export const deleteVehicle = createAsyncThunk(
    'vehicles/delete',
    async (vehicleId: string) => {
        await vehicleService.deleteVehicle(vehicleId);
        return vehicleId;
    }
);
