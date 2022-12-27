import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import Footer from './pages/footer/Footer';
import NavBar from './pages/nav/NavBar';
import { observer } from 'mobx-react-lite';
import PreLoader from "./PreLoader";

const App = observer(() => {

  return (
    <BrowserRouter>
      <PreLoader>
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
