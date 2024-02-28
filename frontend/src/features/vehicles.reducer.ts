import { createSlice } from '@reduxjs/toolkit';
import { deleteVehicle, fetchVehicleById, fetchVehicles, registerVehicle, updateVehicle } from './vehicles.thunks';
import { IVehicle } from '@tenderd/shared/interfaces/vehicle.interface';
import { RootState } from '../app/store';

interface VehiclesState {
    vehicles: IVehicle[];
    loading: boolean;
    error: string | null;
}

const initialState: VehiclesState = {
    vehicles: [],
    loading: false,
    error: null,
};

export const selectVehicleById = (state: RootState, vehicleId?: string) => state.vehicles.vehicles.find(v => v._id === vehicleId);


const vehiclesSlice = createSlice({
    name: 'vehicles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVehicles.pending || registerVehicle.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error to null when loading
            })
            .addCase(fetchVehicles.fulfilled, (state, action) => {
                state.loading = false;
                state.vehicles = action.payload;
            })
            .addCase(fetchVehicles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch vehicles'; // Provide a default error message
            })
            .addCase(registerVehicle.fulfilled, (state, action) => {
                state.loading = false;
                console.log('your new vehicle: ', action.payload);
                state.vehicles = [...state.vehicles, action.payload];
            })
            .addCase(updateVehicle.fulfilled, (state, action) => {
                const index = state.vehicles.findIndex(vehicle => vehicle._id === action.payload._id);
                if (index !== -1) {
                    state.vehicles[index] = action.payload; // Update the vehicle in the state
                }
            })
            .addCase(deleteVehicle.fulfilled, (state, action) => {
                const index = state.vehicles.findIndex(vehicle => vehicle._id === action.payload);
                delete state.vehicles[index];
            })
            .addCase(fetchVehicleById.fulfilled, (state, action) => {
                const index = state.vehicles.findIndex(vehicle => vehicle._id === action.payload[0]._id);
                if (index !== -1) {
                    // Replace the old vehicle data with the updated one
                    state.vehicles[index] = action.payload[0];
                } else {
                    // Optionally handle the case where the vehicle isn't found, maybe add it to the list
                    state.vehicles.push(action.payload[0]);
                }
            });
    },
});

export default vehiclesSlice.reducer;
