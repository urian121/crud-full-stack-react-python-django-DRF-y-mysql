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
        <div className="row justify-content-center">
          <div className="col-md-12 d-flex justify-content-center align-items-center gap-3">
            <img src="/img/react.svg" alt="React" width={100} />
            <span>+</span>
            <img src="/img/python.webp" alt="Python" width={100} />
            <span>+</span>
            <img src="/img/django.webp" alt="Django" width={100} />
            <span>+</span>
            <img src="/img/mysql.webp" alt="MySQL" width={80} />
          </div>
        </div>

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
