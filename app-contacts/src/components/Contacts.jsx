import { useEffect, useState } from "react";
import { Modal } from "bootstrap";
import axios from "axios";
import ContactModal from "./ContactModal";


const Contacts = () => {
  const URL_API = "http://127.0.0.1:8000/api/contactos/";
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  /**
   * Función para obtener los contactos al cargar el componente
   */
  useEffect(() => {
    fetchContacts();
  }, []);

  /**
   * Función para obtener los contactos
   */
  const fetchContacts = async () => {
    try {
      const response = await axios.get(URL_API);
      setContacts(response.data); // Suponiendo que la API devuelve un array de contactos
    } catch (error) {
      console.error("Error al obtener los contactos:", error);
      setError("Error al cargar los contactos");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center">Cargando contactos...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  const eliminarContacto = async (id) => {
    if (
      !window.confirm("¿Estás seguro de que deseas eliminar este contacto?")
    ) {
      return;
    }

    try {
      await axios.delete(`${URL_API}${id}/eliminar/`);
      alert("Contacto eliminado correctamente");

      // Actualiza la lista de contactos después de la eliminación
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error("Error al eliminar el contacto:", error);
      alert("No se pudo eliminar el contacto.");
    }
  };

  // Función para abrir el modal con la info del contacto

const abrirModalEditar = (contact) => {
  setSelectedContact(contact);
  const modal = new Modal(document.getElementById("editModal"));
  modal.show();
};


  // Función para actualizar el contacto
const handleUpdateContact = async (e) => {
  e.preventDefault();
  try {
    await axios.put(
      `${URL_API}${selectedContact.id}/actualizar/`,
      selectedContact
    );
    alert("Contacto actualizado correctamente");
    fetchContacts(); // Asegúrate de que fetchContacts esté disponible

    // Obtener instancia del modal y ocultarlo
    const modal = Modal.getInstance(document.getElementById("editModal"));
    if (modal) modal.hide();
  } catch (error) {
    console.error("Error al actualizar el contacto:", error);
    alert("No se pudo actualizar el contacto.");
  }
};
    
  return (
    <>
      <h2 className="text-center fw-bold border-bottom mb-4 mt-5">
        Lista de Contactos
      </h2>
      {contacts.length === 0 ? (
        <p className="text-center fw-bold">No hay contactos disponibles</p>
      ) : (
        <section className="list-contacts">
          {contacts.map((contact) => (
            <div
              className="row align-items-center border-bottom py-2 mb-2"
              key={contact.id}
            >
              <div className="col-3">
                <img
                  src="./avatar.png"
                  alt="{contact.nombre}"
                  className="img-fluid"
                />
              </div>
              <div className="col-6">
                <h6 className="mb-1 title-product fw-bold">{contact.nombre}</h6>
                <p className="mb-0 detalles-product">
                  Profesión: {contact.profesion}
                </p>
                <p className="mb-0 detalles-product">
                  Edad: {contact.edad} años
                </p>
                <p className="mb-0 detalles-product">Sexo: {contact.sexo}</p>
              </div>
              <div className="col-2 d-flex flex-column ms-auto">
                <button
                  className="btn btn-warning btn-sm mt-2"
                  onClick={() => abrirModalEditar(contact)}
                >
                  Editar <i className="bi bi-pen"></i>
                </button>
                <button
                  className="btn btn-danger btn-sm mt-2"
                  onClick={() => eliminarContacto(contact.id)}
                >
                  Borrar <i className="bi bi-trash3"></i>
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Modal para Editar Contacto */}
      <ContactModal
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
        handleUpdateContact={handleUpdateContact}
        modalId="editModal"
      />
    </>
  );
};

export default Contacts;
