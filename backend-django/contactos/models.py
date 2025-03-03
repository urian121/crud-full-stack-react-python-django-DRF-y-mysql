from django.db import models

class Contacto(models.Model):
    nombre = models.CharField(max_length=255)
    profesion = models.CharField(max_length=255)
    edad = models.IntegerField()
    habla_ingles = models.BooleanField()
    foto_contacto = models.ImageField(upload_to='fotos_contactos/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre}, {self.profesion}, {self.edad}, {self.habla_ingles}"

    class Meta:
        db_table = "tbl_contactos"
        ordering = ['-created_at']