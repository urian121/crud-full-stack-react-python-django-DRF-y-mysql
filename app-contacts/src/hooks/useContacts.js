import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { miToast } from "../data/toast";


const URL_API = "http://127.0.0.1:8000/api-contactos/";

const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  /**
   * Función para obtener los contactos al cargar el componente
   */
  useEffect(() => {
    fetchContacts();
  }, []);

  /**
   * Función para obtener los contactos al cargar el componente
   */
  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${URL_API}`);
      setContacts(response.data);
      //setContacts([...response.data]);
      setError(null);
    } catch (error) {
      console.error("Error al obtener los contactos:", error);
      setError("Error al cargar los contactos");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    console.log("Datos recibidos:", data);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, key === "foto_contacto" ? value[0] : value);
    });

    try {
      const response = await axios.post(`${URL_API}nuevo/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Respuesta del servidor**:", response.data);
      //setContacts([...response.data]);

      // setContacts((prevContacts) => [...prevContacts, response.data]); // Agregar nuevo contacto directamente
      // fetchContacts();
      // reset(); // Resetea el formulario después de enviar los datos
      miToast("Contacto agregado correctamente", "success");
    } catch (error) {
      console.error("Error al guardar contacto:", error);
    }
  };

  const eliminarContacto = async (id) => {
    try {
      await axios.delete(`${URL_API}${id}/eliminar/`);
      setContacts((prevContacts) => prevContacts.filter((c) => c.id !== id));
      miToast("Contacto eliminado correctamente", "warning");
    } catch (error) {
      console.error("Error al eliminar el contacto:", error);
    }
  };

  const actualizarContacto = async (contact, onSuccess) => {
    try {
      const formData = new FormData();
      console.log("contact:", contact);

      // Agregar campos al FormData
      formData.append("nombre", contact.nombre);
      formData.append("profesion", contact.profesion);
      formData.append("edad", contact.edad);
      formData.append("sexo", contact.sexo);

      // Si hay una nueva imagen, agregarla al FormData
      if (contact.foto_contacto instanceof File) {
        formData.append("foto_contacto", contact.foto_contacto);
      }
      console.log("formData:", formData);

      await axios.put(`${URL_API}${contact.id}/actualizar/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      miToast("Contacto actualizado correctamente", "info");
      fetchContacts(); // Actualiza la lista
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error al actualizar el contacto:", error);
    }
  };

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    eliminarContacto,
    actualizarContacto,

    register,
    handleSubmit,
    watch,
    errors,
    onSubmit,
    reset,
  };
};

export default useContacts;