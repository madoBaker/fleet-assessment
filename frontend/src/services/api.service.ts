import axios, { AxiosInstance } from 'axios';

class ApiService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:4040/', // Your API base URL
        });
    }

    public async get(path: string) {
        try {
            const response = await this.axiosInstance.get(path);
            return response.data;
        } catch (error) {
            throw error
        }
    }

    public async post(path: string, body: any) {
        try {
            const response = await this.axiosInstance.post(path, body);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async put(path: string, body: any) {
        try {
            const response = await this.axiosInstance.put(path, body);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async delete(path: string) {
        try {
            const response = await this.axiosInstance.delete(path);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const apiService = new ApiService();
