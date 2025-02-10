import { useForm } from "react-hook-form";
import axios from "axios";
import { profesiones } from "../data/profesiones";


const Formulario = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Datos recibidos:", data);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/contactos/nuevo/",
        data
      );
      console.log("Respuesta del servidor:", response.data);
      alert("Formulario enviado con éxito");
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al enviar el formulario");
    }
  };

  // Obtenemos el valor del checkbox en tiempo real
  const hablaIngles = watch("habla_ingles", false);

  return (
    <>
      <h2 className="text-center fw-bold border-bottom mb-4">
        Agregar Contacto
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <button type="submit" className="btn btn-primary w-100">
          Guardar Contacto &nbsp; <i className="bi bi-arrow-right"></i>
        </button>
      </form>
    </>
  );
};

export default Formulario;
