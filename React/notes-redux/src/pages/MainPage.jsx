import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NoteList from "../components/NoteList";

const MainPage = () => {
    return (
        <div className="App">
            <div className="container">
                <Navbar/>
                <NoteList/>
                <Footer/>
            </div>
        </div>
      );
}
 
export default MainPage;