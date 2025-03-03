import uuid
import os

def asignar_nombre_aleatorio(imagen):
    """ Asigna un nombre aleatorio a la imagen usando uuid. """
    if imagen:
        extension = os.path.splitext(imagen.name)[1]  # Obtener la extensión del archivo
        nuevo_nombre = f"{uuid.uuid4()}{extension}"  # Generar nombre único
        imagen.name = nuevo_nombre  # Asignar el nuevo nombre
    return imagen
