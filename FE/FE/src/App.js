import AllRoutes from "./components/AllRoutes";
import './App.css';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    document.title = 'Photo Sharing App';
  }, [])

  return (
    <AllRoutes/>
  );
}

export default App;
