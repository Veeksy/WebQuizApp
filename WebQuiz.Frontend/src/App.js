import './App.css';
import './style/styles.css'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Route as pathRoute } from './content/routes';
import { MainPage } from './component/MainPage';
import { RequisitesPage } from './component/RequisitesPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path={pathRoute.Main.path} element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
