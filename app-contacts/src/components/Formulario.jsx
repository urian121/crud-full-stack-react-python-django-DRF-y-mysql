import useContacts from "../hooks/useContacts";
import { profesiones } from "../data/profesiones";

const Formulario = () => {
  const { register, handleSubmit, watch, errors, onSubmit } = useContacts();

  // Obtenemos el valor del checkbox en tiempo real
  const hablaIngles = watch("habla_ingles", false);

  return (
    <>
      <h2 className="text-center fw-bold border-bottom mb-4 p-2">
        Agregar Contacto
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            {...register("nombre", { required: "El nombre es obligatorio" })}
          />
          {errors.nombre && (
            <small className="text-danger">{errors.nombre.message}</small>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="profesion" className="form-label">
            Profesión
          </label>
          <select
            className="form-select"
            {...register("profesion", { required: "Selecciona una profesión" })}
          >
            <option value="">Seleccione una profesión</option>
            {profesiones.map((profesion) => (
              <option key={profesion} value={profesion}>
                {profesion}
              </option>
            ))}
          </select>

          {errors.profesion && (
            <small className="text-danger">{errors.profesion.message}</small>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Sexo</label>
          <div className="form-check">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                {...register("sexo", { required: "Selecciona un sexo" })}
                value="Masculino"
              />
              Masculino
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                {...register("sexo")}
                value="Femenino"
              />
              Femenino
            </label>
          </div>
          {errors.sexo && (
            <small className="text-danger">{errors.sexo.message}</small>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="edadRange" className="form-label">
            Edad: <span>{watch("edad") || 18}</span> años
          </label>
          <input
            type="range"
            className="form-range"
            {...register("edad")}
            min="18"
            max="60"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ingles">¿Habla inglés?</label>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              {...register("habla_ingles")}
            />
            <label className="form-check-label">
              {hablaIngles ? "Sí" : "No"}
            </label>
          </div>
        </div>

        <div className="mb-3 mt-4">
          <label className="form-label">Cambiar Foto del empleado</label>
          <input
            className="form-control form-control-sm"
            type="file"
            name="avatar"
            {...register("foto_contacto")}
            accept="image/png, image/jpeg"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Guardar Contacto &nbsp; <i className="bi bi-arrow-right"></i>
        </button>
      </form>
    </>
  );
};

export default Formulario;
