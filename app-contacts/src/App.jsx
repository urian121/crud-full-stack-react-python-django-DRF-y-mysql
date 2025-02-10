// Importar Bootstrap CSS y sus iconos
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
  
import NavBar from './components/NavBar';
import Formulario from './components/Formulario';
import Contacts from './components/Contacts';

function App() {

  return (
    <>
      <NavBar />
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-5 mt-5">
            <Formulario />
          </div>
          <div className="col-md-7">
            <Contacts />
          </div>
        </div>
      </div>
    </>
  );
}

export default App
