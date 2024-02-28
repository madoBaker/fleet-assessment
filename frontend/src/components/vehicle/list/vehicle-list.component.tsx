import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { useNavigate } from 'react-router-dom'

function VehicleListComponent() {
    const vehicles = useSelector((state: RootState) => state.vehicles.vehicles);
    const navigate = useNavigate();

    return(
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Make</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Maintenance Records</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vehicles.map((vehicle, index) => (
                        <TableRow
                            key={vehicle._id}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)', // Change as desired
                                },
                                cursor: 'pointer',
                            }}
                            onClick={() => navigate(`/vehicle/view/${vehicle._id}`)}
                        >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell>{vehicle.make}</TableCell>
                            <TableCell>{vehicle.year}</TableCell>
                            <TableCell>{vehicle.status}</TableCell>
                            <TableCell>{vehicle.maintenanceRecords ? vehicle.maintenanceRecords.length : 0}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
    )
}

export default VehicleListComponent;
