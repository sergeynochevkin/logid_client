import { BrowserRouter, Outlet } from "react-router-dom";
import AppRouter from "./AppRouter";
import { observer } from "mobx-react-lite";
import PreLoader from "./PreLoader";
import Fetcher from "./Fetcher";
import Notificator from "./Notificator";
import "./App.css";
import Geolocator from "./Geolocator";
import AppWrapper from './hoc/AppWrapper';
import NavBar from './components/nav/NavBar';
import Footer from './components/footer/Footer';

const App = observer(() => {
  return (
    <BrowserRouter>
    <AppWrapper>
      <PreLoader>
        <Fetcher />
        <Geolocator />
        <Notificator />
        <NavBar />
        <AppRouter>
          <div className="App">
          </div>
        </AppRouter>
        <Footer />
      </PreLoader>
      </AppWrapper>
    </BrowserRouter>
  );
});

export default App;
