import React, { useContext, useState } from 'react';
import { Button } from '@mui/material';
import useProducts from './ProductsProvider/useProducts';
import AddProductDialog from './AddProductDialog';

const AddProductButton = () => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpenDialog}
                style={{
                    position: 'fixed',
                    right: 20,
                    bottom: 20,
                }}
            >
                Dodaj Produkt
            </Button>
            <AddProductDialog isOpen={openDialog} handleClose={handleCloseDialog} />
        </>
    );
};

export default AddProductButton;
