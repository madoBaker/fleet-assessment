import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useNavigate } from 'react-router-dom';
import { differenceInSeconds, formatDistanceToNow } from 'date-fns';

function HomeComponent() {
    const vehicles = useSelector((state: RootState) => state.vehicles.vehicles);
    const navigate = useNavigate();

    // Sort vehicles by updatedAt in descending order, ensuring immutability
    const sortedVehicles = [...vehicles].sort((a, b) => {
        // Convert updatedAt to Date objects for comparison, default to 0 if undefined
        const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        return dateB - dateA; // Sort in descending order
    });

    return (
        <Box display="flex" flexWrap="wrap" justifyContent="center">
            {sortedVehicles.map((vehicle, index) => (
                <Card key={index} sx={{ maxWidth: 345, m: 2 }}>
                    <CardActionArea>
                        <CardContent onClick={() => navigate(`/vehicle/view/${vehicle._id}`)}>
                            <Box display="flex" alignItems="center">
                                <DirectionsCarIcon sx={{ fontSize: 40, mr: 2 }} />
                                <Typography gutterBottom variant="h5" component="div">
                                    {vehicle.make} {vehicle.year}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                <b>Year:</b> {vehicle.year}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <b>Status:</b> {vehicle.status}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <b>Speed:</b> {vehicle.speed?.toFixed() || 0} km/hr
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <b>Location:</b> {vehicle.location?.longitude?.toFixed(4) || 'N/A'}, {vehicle.location?.latitude?.toFixed(4) || 'N/A'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <b>Distance traveled:</b> {vehicle.usageStats?.distanceTraveled?.toFixed(2) || 0} KM
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <b>Hours operated:</b> {vehicle.usageStats?.hoursOperated.toFixed(1) || 0} Hours
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <b>Last updated:</b> {
                                vehicle.updatedAt ? (
                                    differenceInSeconds(new Date(), new Date(vehicle.updatedAt)) < 60
                                        ? `${differenceInSeconds(new Date(), new Date(vehicle.updatedAt))} seconds ago`
                                        : formatDistanceToNow(new Date(vehicle.updatedAt)) + ' ago'
                                ) : 'N/A'
                            }
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </Box>
    );
}

export default HomeComponent;
