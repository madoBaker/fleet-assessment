import { useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Add, Menu } from '@mui/icons-material';
import React from 'react';

interface ToolbarComponentProps {
    handleDrawerToggle: () => void;
}

const ToolbarComponent: React.FC<ToolbarComponentProps> = ({ handleDrawerToggle }) => {
    const location = useLocation();
    const navigate = useNavigate();
    let title: string = 'Home';
    let createButtonText: string | null = null;

    switch (location.pathname.split('/')[1]) {
        case 'home':
            title = 'Home';
            break;
        case 'vehicle':
            title = createButtonText = 'Vehicle';
            break;
        default:
            title = 'Tenderd';
            break;
    }

    const handleNewButtonClick = () => {
        navigate(`${location.pathname}/create`);
    };

    return (
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2 }}
                >
                    <Menu />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
                {/* This Box acts as a spacer, pushing the button to the right */}
                <Box sx={{ flexGrow: 1 }}></Box>
                {createButtonText && (
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<Add />}
                        onClick={handleNewButtonClick}
                    >
                        New {createButtonText}
                    </Button>
                )}
            </Toolbar>
    );
};

export default ToolbarComponent;
