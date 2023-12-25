import { BrowserRouter, Outlet } from "react-router-dom";
import AppRouter from "./AppRouter";
import Footer from "./pages/footer/Footer";
import NavBar from "./pages/nav/NavBar";
import { observer } from "mobx-react-lite";
import PreLoader from "./PreLoader";
import Fetcher from "./Fetcher";
import Notificator from "./Notificator";
import "./App.css";
import Geolocator from "./Geolocator";
import AppWrapper from './hoc/AppWrapper';

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
