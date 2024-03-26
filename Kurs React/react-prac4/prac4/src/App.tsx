import './App.css'
import RecipeTracker from './components/RecipeTracker/RecipeTracker';
import RecipeProvider from './providers/RecipeProvider';

function App() {

  return (
    <div className="App">
      <h1>Moje przepisy</h1>
      <RecipeProvider>
        <RecipeTracker />
      </RecipeProvider>
    </div>
  )
}

export default App
