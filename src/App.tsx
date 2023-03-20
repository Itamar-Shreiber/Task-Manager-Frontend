import "./App.css";
import Header from "./Components/LayoutArea/Header/Header";
import Menu from "./Components/LayoutArea/Menu/Menu";
import Footer from "./Components/LayoutArea/Footer/Footer";
import Main from "./Components/LayoutArea/Main/Main";

function App() {
    return (
        <div className="App">
            <Header />
            <Menu />
            <Main />
            <Footer />
        </div>
    );
}

export default App;
