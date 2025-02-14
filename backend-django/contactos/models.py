from django.db import models
import uuid
import os

class Contacto(models.Model):
    nombre = models.CharField(max_length=255)
    profesion = models.CharField(max_length=255)
    edad = models.IntegerField()
    habla_ingles = models.BooleanField()
    foto_contacto = models.ImageField(upload_to='fotos_contactos/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre, self.profesion, self.edad, self.habla_ingles
    
    def save(self, *args, **kwargs):
        # Genera un nombre único para el archivo utilizando UUID
        nombre_unico = f'{uuid.uuid4()}{self.get_extension()}'

        # Asigna el nombre único al campo de la imagen
        self.foto_contacto.name = nombre_unico
        super().save(*args, **kwargs)
    
    class Meta:
        db_table = "tbl_contactos"
        ordering = ['-created_at']



    def get_extension(self):
        # Usa el nombre correcto del campo de imagen
        extension = os.path.splitext(self.foto_contacto.name)[1] if self.foto_contacto else ""
        return extension
