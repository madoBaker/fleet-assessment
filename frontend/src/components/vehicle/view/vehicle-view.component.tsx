import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { selectVehicleById } from '../../../features/vehicles.reducer';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { IVehicle } from '@tenderd/shared/interfaces/vehicle.interface';
import { VehicleStatus } from '@tenderd/shared/enums/vehicle-status.enum';
import { deleteVehicle, updateVehicle } from '../../../features/vehicles.thunks';

function VehicleViewComponent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const vehicle: IVehicle = useSelector((state: RootState) => selectVehicleById(state, id)) || {} as IVehicle;

    // Initialize vehicleData with default values for all fields
    const [vehicleData, setVehicleData] = useState<IVehicle>({
        ...vehicle,
        make: '',
        year: 0,
        status: VehicleStatus.ACTIVE,
    });

    useEffect(() => {
        if (!vehicle || Object.keys(vehicle).length === 0) {
            console.log('Vehicle not found');
            navigate('/vehicle'); // navigate back to a default page
        } else {
            setVehicleData(vehicle);
        }
    }, [vehicle, navigate]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setVehicleData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        console.log('Handling data: ', vehicleData);
        dispatch(updateVehicle(vehicleData));
        navigate('/vehicle'); // Optionally navigate back or to a confirmation page
    };

    const handleDelete = () => {
        dispatch(deleteVehicle(vehicleData._id || ''));
        navigate('/vehicle'); // Navigate back to the list or home page
    };

    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <Container>
            <Box sx={{ marginY: 5 }}>
                <TextField
                    label="Make"
                    variant="outlined"
                    name="make"
                    value={vehicleData.make}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Year"
                    variant="outlined"
                    name="year"
                    value={vehicleData.year}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                        labelId="status-label"
                        label="Status"
                        value={vehicleData.status || ''} // Ensure the value is never undefined
                        onChange={handleChange}
                        name="status"
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        {Object.values(VehicleStatus).map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                    <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
                    <Button variant="contained" onClick={handleBack}>Back</Button>
                </Box>
            </Box>
        </Container>
    );
}

export default VehicleViewComponent;
