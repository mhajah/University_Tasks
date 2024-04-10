import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';


export default function Navigation() {
    return (
        <AppBar position="sticky" color='secondary'>
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              DRUTEX
            </Typography>
            <IconButton>
                <AccountCircle fontSize='large'/>
            </IconButton>
          </Toolbar>
        </AppBar>
    );
}