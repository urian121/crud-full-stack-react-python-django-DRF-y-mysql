from django.urls import path
from .views import listar_contactos, crear_contacto, detalle_contacto, actualizar_contacto, eliminar_contacto

urlpatterns = [
    path('contactos/', listar_contactos, name="listar_contactos"),
    path('contactos/nuevo/', crear_contacto, name="crear_contacto"),
    path('contactos/<int:id>/', detalle_contacto, name="detalle_contacto"),
    path('contactos/<int:id>/actualizar/', actualizar_contacto, name="actualizar_contacto"),
    path('contactos/<int:id>/eliminar/', eliminar_contacto, name="eliminar_contacto"),
]
