import { profesiones } from "../data/profesiones";

const ContactModal = ({
  selectedContact,
  setSelectedContact,
  handleUpdateContact,
  modalId = "editModal",
}) => {
  return (
    <div className="modal fade" id={modalId} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Contacto</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            {selectedContact && (
              <form onSubmit={handleUpdateContact}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedContact.nombre}
                    onChange={(e) =>
                      setSelectedContact({
                        ...selectedContact,
                        nombre: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Profesión</label>
                  <select
                    className="form-select"
                    value={selectedContact?.profesion || ""}
                    onChange={(e) =>
                      setSelectedContact({
                        ...selectedContact,
                        profesion: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Seleccione una profesión</option>
                    {profesiones.map((profesion) => (
                      <option key={profesion} value={profesion}>
                        {profesion}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Edad: {selectedContact.edad} años
                  </label>
                  <input
                    type="range"
                    className="form-range"
                    value={selectedContact.edad}
                    onChange={(e) =>
                      setSelectedContact({
                        ...selectedContact,
                        edad: e.target.value,
                      })
                    }
                    min="18"
                    max="60"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Sexo</label>
                  <select
                    className="form-control"
                    value={selectedContact.sexo}
                    onChange={(e) =>
                      setSelectedContact({
                        ...selectedContact,
                        sexo: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </select>
                </div>
                <div className="d-flex justify-content-center mt-5">
                  <button type="submit" className="btn btn-primary">
                    Guardar cambios &nbsp; <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
