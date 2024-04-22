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
                            paginationModel: { page: 0, pageSize: 6 },
                        },
                    }}
                    pageSizeOptions={[6, 10, 20]}
                    checkboxSelection={false}
                    sx={{
                        "& .MuiDataGrid-row:hover": {
                          backgroundColor: "skyblue"
                        }
                    }}
                />
            </div>
    );
}