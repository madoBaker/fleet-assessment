import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import ToolbarComponent from '../toolbar/toolbar.component';
import SideMenuComponent from '../sidemenu/sidemenu.component';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import VehicleListComponent from '../vehicle/list/vehicle-list.component';
import HomeComponent from '../home/home';
import VehicleCreateComponent from '../vehicle/create/vehicle-create.component';
import VehicleViewComponent from '../vehicle/view/vehicle-view.component';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { useEffect } from 'react';
import { fetchVehicles } from '../../features/vehicles.thunks';
import { wsService } from '../../services/webSocket.service';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function App() {
    const dispatch: AppDispatch = useDispatch()
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(fetchVehicles());
    }, [dispatch]);

    useEffect(() => {
        wsService.connect('ws://localhost:8080');
        wsService.onMessage((message) => {
            // Dispatch Redux action based on the message
            console.log('WebSocket message:', message);
            // Example: dispatch(updateDataAction(message));
        });
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <ToolbarComponent handleDrawerToggle={handleDrawerOpen} />
                </AppBar>
                <SideMenuComponent handleDrawerClose={handleDrawerClose} isOpen={open} handleDrawerToggle={handleDrawerOpen} />
                <Main open={open}>
                    <DrawerHeader />
                    <Routes>
                        <Route path="/home" element={<HomeComponent />} />
                        <Route path="/vehicle" element={<VehicleListComponent />} />
                        <Route path="/vehicle/create" element={<VehicleCreateComponent />} />
                        <Route path="/vehicle/view/:id" element={<VehicleViewComponent />} />
                    </Routes>
                </Main>
            </Box>
        </BrowserRouter>

    );
}
