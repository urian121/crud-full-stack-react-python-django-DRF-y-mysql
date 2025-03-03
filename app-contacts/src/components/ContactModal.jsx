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
              <form
                onSubmit={handleUpdateContact}
                encType="multipart/form-data"
              >
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

                <div className="mb-3 mt-4">
                  <label className="form-label">
                    Cambiar Foto del empleado
                  </label>
                  <input
                    className="form-control form-control-sm"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) =>
                      setSelectedContact({
                        ...selectedContact,
                        foto_contacto: e.target.files[0],
                      })
                    }
                  />
                </div>

                <div className="text-center mt-3">
                  <img
                    src={
                      selectedContact?.foto_contacto instanceof File
                        ? URL.createObjectURL(selectedContact.foto_contacto)
                        : selectedContact?.foto_contacto
                        ? `http://127.0.0.1:8000${selectedContact.foto_contacto}`
                        : "http://localhost:5174/avatar.png"
                    }
                    alt={selectedContact?.nombre || "Contacto"}
                    className="img-fluid rounded-circle"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
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
