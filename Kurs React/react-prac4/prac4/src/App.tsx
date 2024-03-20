import './App.css'
import RecipeTracker from './components/RecipeTracker/RecipeTracker';
import RecipeProvider from './providers/RecipeProvider';

function App() {

  return (
    <div className="App">
      <RecipeProvider>
        <RecipeTracker />
      </RecipeProvider>
    </div>
  )
}

export default App
