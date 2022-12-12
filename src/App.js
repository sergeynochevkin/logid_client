import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import Footer from './components/ui/footer/Footer';
import NavBar from './components/ui/navBar/NavBar';
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
