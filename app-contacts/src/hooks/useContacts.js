import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { miToast } from "../data/toast";


const URL_API = "http://127.0.0.1:8000/api/contactos/";

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
      const response = await axios.get(URL_API);
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
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/contactos/nuevo/",
          data
        );
        console.log("Respuesta del servidor**:", response.data);
        miToast("Contacto agregado correctamente", "success");

        // setContacts((prevContacts) => [...prevContacts, response.data]); // Agregar nuevo contacto directamente
        // fetchContacts();
        // reset(); // Resetea el formulario después de enviar los datos
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
      await axios.put(`${URL_API}${contact.id}/actualizar/`, contact);
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
  };
};

export default useContacts;