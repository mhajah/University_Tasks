import { createContext, useReducer, useState, useCallback } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { IProducts } from '../types/Products.type';

export const ProductsContext = createContext<{
    columns: GridColDef[];
    rows: IProducts[],
    handleDelete: (id:number) => void;
    addProduct: (product: IProducts) => void;
    newProduct: IProducts;
    setNewProduct: React.Dispatch<React.SetStateAction<IProducts>>;

}| undefined>(undefined);

const initialRows: IProducts[] = [
    { id: 1, name: "Drut", type: 'Żelazny', price: 15, avail: true, noitems: 180},
    { id: 2, name: "Bolt", type: 'Aluminiowy', price: 25, avail: true, noitems: 300},
    { id: 3, name: "Śruba", type: 'Plastikowy', price: 5, avail: true, noitems: 150},
    { id: 4, name: "Klamra", type: 'Plastikowy', price: 15, avail: true, noitems: 100},
    { id: 5, name: "Łącznik", type: 'Stalowy', price: 30, avail: true, noitems: 200},
    { id: 6, name: "Klamra", type: 'Aluminiowy', price: 20, avail: true, noitems: 200},
    { id: 7, name: "Śruba", type: 'Miedziany', price: 20, avail: false, noitems: 100}
]

const ProductsProvider = ({ children }: { children: React.ReactNode }) => {

    const [rows, setRows] = useState(initialRows);
    const [newProduct, setNewProduct] = useState<IProducts>({
        id: 0,
        name: '',
        type: '',
        price: 0,
        avail: true,
        noitems: 0,
    });

    const handleDelete = useCallback((id: number) => {
        console.log('Usuwanie produktu o id:', id);
        setRows((prevRows) => prevRows.filter(row => row.id !== id));
    }, []);

    const addProduct = (newProductData: IProducts) => {
        const {id, ...rest} = newProductData;
        const newProduct = {
            id: rows.length > 0 ? Math.max(...rows.map(row => row.id)) + 1 : 1,
            ...rest
        };
    
        setRows([...rows, newProduct]);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70, type: "number" },
        { field: 'name', headerName: 'Nazwa', width: 130 },
        { field: 'type', headerName: 'Typ', width: 130 },
        { field: 'price', 
          headerName: 'Cena (PLN)', 
          width: 100,
          valueGetter: (_value: any, row: any) => `${row.price || ''} PLN`,
        },
        { field: 'avail', 
          headerName: 'Dostępność', 
          width: 120,
          valueGetter: (_value: any, row: any) => `${row.avail ? 'TAK' : 'NIE'}`,
        },
        { field: 'noitems', headerName: "Liczba dostępnych sztuk", width: 180 },
        { field: 'actions', 
          headerName: "Akcje", 
          width: 50, 
          sortable: false, 
          renderCell: (params) => (
            <IconButton onClick={() => handleDelete(+params.id)}>
              <DeleteIcon style={{color: "red"}}/>
            </IconButton>
          ),
        }
    ];

    return (
        <ProductsContext.Provider value={{ columns, rows, handleDelete, addProduct, newProduct, setNewProduct }}>
            {children}
        </ProductsContext.Provider>
    );
}


export default ProductsProvider;