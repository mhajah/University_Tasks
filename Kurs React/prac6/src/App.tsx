
import './App.css';
import Navigation from './components/Navigation';
import ProductsTable from './components/ProductsTable';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProductsProvider from "./components/ProductsProvider/ProductsProvider";
import AddProductButton from './components/AddProductButton';


const theme = createTheme({
  components: {
      MuiDataGrid: {
          styleOverrides: {
              root: {
                  color: 'white',

              },
              columnHeaderTitle: {
                  fontWeight: 'bold',
                  color: 'black',
              },
              footerContainer: {
                  backgroundColor: "white",
              },

              row: {
                  backgroundColor: "lightgrey",
                  color: "black"
              },

              
          },
      },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ProductsProvider>
        <div>
          <Navigation />
          <ProductsTable />
          <AddProductButton />
        </div>
      </ProductsProvider>
    </ThemeProvider>
  );
}

export default App
