import React, { useState, useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import useProducts from './ProductsProvider/useProducts';

interface AddProductDialogProps {
    isOpen: boolean;
    handleClose: () => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ isOpen, handleClose }) => {
    const { addProduct, newProduct, setNewProduct } = useProducts();

    const [errors, setErrors] = useState({ name: '', type: '', price: '', noitems: '' });

    const validate = () => {
        let tempErrors = { name: '', type: '', price: '', noitems: '' };
        tempErrors.name = !newProduct.name ? 'To pole jest wymagane.' : '';
        tempErrors.type = !newProduct.type ? 'Typ produktu jest wymagany.' : '';
        tempErrors.price = newProduct.price <= 0 ? 'Cena musi być większa od 0.' : '';
        tempErrors.noitems = newProduct.noitems < 0 ? 'Liczba sztuk nie może być ujemna.' : '';
        setErrors(tempErrors);

        return Object.values(tempErrors).every(x => x === "");
    };

    const handleChange = (event: any) => {
        const { name, value, type, checked } = event.target;
        setNewProduct((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = () => {
        if (validate()) {
            addProduct(newProduct);
            handleClose();
        }
    };


    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Dodaj nowy produkt</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Nazwa produktu"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={newProduct.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                />
                <TextField
                    margin="dense"
                    name="type"
                    label="Typ produktu"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={newProduct.type}
                    onChange={handleChange}
                    error={!!errors.type}
                    helperText={errors.type}
                    required
                />
                <TextField
                    margin="dense"
                    name="price"
                    label="Cena"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={newProduct.price}
                    onChange={handleChange}
                    error={!!errors.price}
                    helperText={errors.price}
                    required
                />
                <TextField
                    margin="dense"
                    name="noitems"
                    label="Liczba dostępnych sztuk"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={newProduct.noitems}
                    onChange={handleChange}
                    error={!!errors.noitems}
                    helperText={errors.noitems}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Anuluj</Button>
                <Button onClick={handleSubmit}>Dodaj</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddProductDialog;
