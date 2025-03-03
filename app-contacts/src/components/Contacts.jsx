import { useState } from "react";
import { Modal } from "bootstrap";
import ContactModal from "./ContactModal";
import useContacts from "../hooks/useContacts"; // Importando mi custom hook

const Contacts = () => {
  const { contacts, loading, error, eliminarContacto, actualizarContacto } =
    useContacts();
  const [selectedContact, setSelectedContact] = useState(null);

  const abrirModalEditar = (contact) => {
    setSelectedContact(contact);
    const modal = new Modal(document.getElementById("editModal"));
    modal.show();
  };

  const handleUpdateContact = async (e) => {
    e.preventDefault();
    actualizarContacto(selectedContact, () => {
      const modal = Modal.getInstance(document.getElementById("editModal"));
      if (modal) modal.hide();
    });
  };

  if (loading) return <p className="text-center">Cargando contactos...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <>
      <h2 className="text-center fw-bold border-bottom mb-4 mt-5 p-2">
        Lista de Contactos{" "}
        <strong className="float-end">({contacts.length})</strong>
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
                  src={
                    contact.foto_contacto
                      ? `http://127.0.0.1:8000${contact.foto_contacto}`
                      : "http://localhost:5174/avatar.png"
                  }
                  alt={contact.nombre}
                  className="img-fluid rounded-circle"
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
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
