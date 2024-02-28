import { apiService } from './api.service';
import { IVehicle } from '@tenderd/shared/interfaces/vehicle.interface';

class VehicleService {
    private basePath = '/vehicles/'; // Base path for vehicle-related API calls

    // Fetches all vehicles
    public async getAllVehicles() {
        return await apiService.get(this.basePath);
    }

    // Fetches all vehicles
    public async getVehicleById(id: string) {
        return await apiService.get(`${this.basePath}/${id}`);
    }

    // Creates a new vehicle
    public async createVehicle(vehicleData: any) {
        return await apiService.post(this.basePath, vehicleData);
    }
    // Fetches all vehicles
    public async updateVehicle(vehicle: IVehicle) {
        return await apiService.put(this.basePath, vehicle);
    }

    // Creates a new vehicle
    public async deleteVehicle(id: string) {
        return await apiService.delete(this.basePath + id);
    }


}

export const vehicleService = new VehicleService();
