import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useProducts from "./ProductsProvider/useProducts";

export default function ProductsTable() {

    const { columns, rows } = useProducts();

    return (
        
            <div style={{ height: 400, width: '75%', color:'white'}  }>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                    checkboxSelection={false}
                />
            </div>
    );
}