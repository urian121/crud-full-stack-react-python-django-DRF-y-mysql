from django.urls import path
from .views import listar_contactos, crear_contacto, detalle_contacto, actualizar_contacto, eliminar_contacto

urlpatterns = [
    path('api-contactos/', listar_contactos, name="listar_contactos"),
    path('api-contactos/nuevo/', crear_contacto, name="crear_contacto"),
    path('api-contactos/<int:id>/', detalle_contacto, name="detalle_contacto"),
    path('api-contactos/<int:id>/actualizar/', actualizar_contacto, name="actualizar_contacto"),
    path('api-contactos/<int:id>/eliminar/', eliminar_contacto, name="eliminar_contacto"),
]
