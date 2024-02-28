import { Dispatch, useState } from 'react';
import { registerVehicle } from '../../../features/vehicles.thunks';
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { VehicleStatus } from '@tenderd/shared/enums/vehicle-status.enum';
import { useNavigate } from 'react-router-dom';

function VehicleCreateComponent() { // Local state for form fields and error handling
    const [make, setMake] = useState('');
    const [year, setYear] = useState('');
    const [status, setStatus] = useState(VehicleStatus.ACTIVE);
    const [error, setError] = useState('');
    const { loading, error: reduxError } = useSelector((state: RootState) => state.vehicles);


    // useDispatch and useSelector hooks for interacting with Redux
    const dispatch:Dispatch<any> = useDispatch();
    const navigate = useNavigate();

    // Validate form inputs before submission
    const validateForm = () => {
        if (!make || !year || !status) {
            setError('All fields are required');
            return false;
        }
        setError('');
        return true;
    };

    // Handle form submission
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (validateForm()) {
            // Dispatch the action with form data if validation passes
            dispatch(registerVehicle({ make, year: parseInt(year, 10), status }));
            navigate('/vehicle');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* TextFields for make and year with basic validation */}
            <TextField
                label="Make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                required
                error={!!error}
                margin="normal"
            />
            <TextField
                label="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
                type="number"
                error={!!error}
                margin="normal"
            />

            {/* Select input for vehicle status */}
            <FormControl fullWidth error={!!error}>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                    labelId="status-label"
                    value={status}
                    label="Status"
                    onChange={(e) => setStatus(e.target.value as VehicleStatus)}
                    required
                >
                    {Object.values(VehicleStatus).map((statusValue) => (
                        <MenuItem key={statusValue} value={statusValue}>
                            {statusValue.charAt(0) + statusValue.slice(1).toLowerCase()}
                        </MenuItem>
                    ))}
                </Select>

            </FormControl>

            {/* Display error messages */}
            {error && <Alert severity="error">{error}</Alert>}
            {reduxError && <Alert severity="error">{reduxError}</Alert>}

            {/* Submit button with loading state */}
            <Button type="submit" variant="contained" disabled={loading}>Submit</Button>
            {loading && <Alert severity="info">Submitting...</Alert>}
        </form>
    );
}

export default VehicleCreateComponent;
