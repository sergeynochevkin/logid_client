import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import Footer from './pages/footer/Footer';
import NavBar from './pages/nav/NavBar';
import { observer } from 'mobx-react-lite';
import PreLoader from "./PreLoader";
import Fetcher from "./Fetcher";
import Notificator from "./Notificator";
import './App.css'
import Geolocator from "./Geolocator";

const App = observer(() => {

  return (
    <BrowserRouter>
      <PreLoader>
        <Fetcher />
        <Geolocator />
        <Notificator />
        <NavBar />
        <AppRouter>
          <div className="App"></div>
        </AppRouter>
        <Footer />
      </PreLoader>
    </BrowserRouter>
  );
})

export default App;
