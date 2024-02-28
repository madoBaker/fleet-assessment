import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Home, DirectionsCar, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';

interface SideMenuComponentProps {
    isOpen: boolean;
    handleDrawerToggle: () => void;
    handleDrawerClose: () => void;
}

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const SideMenuComponent: React.FC<SideMenuComponentProps> = ({ isOpen, handleDrawerToggle, handleDrawerClose }: SideMenuComponentProps) => {
    const navigate = useNavigate();
    const theme = useTheme();

    const itemsList = [
        { text: 'Home', icon: <Home />, onClick: () => onNavigation('/home') },
        { text: 'Vehicles', icon: <DirectionsCar />, onClick: () => onNavigation('/vehicle') },
    ];

    function onNavigation(path: string) {
        navigate(path);
        console.log('handling close...');
        handleDrawerClose();
    }

    return (
        <Drawer
        sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: 240,
                boxSizing: 'border-box',
            },
        }}
        variant="persistent"
        anchor="left"
        open={isOpen}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                </IconButton>
            </DrawerHeader>

            <List>
                {itemsList.map((item, index) => {
                    return (
                        <ListItem key={index} onClick={() => { item.onClick(); handleDrawerToggle(); }}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    );
                })}

            </List>
        </Drawer>
    );
};

export default SideMenuComponent;
