import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import IndexPage from './pages/IndexPage/IndexPage';
import { ChakraProvider } from "@chakra-ui/react"

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<IndexPage />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
