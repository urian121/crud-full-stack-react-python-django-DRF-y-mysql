# Guía para Crear una API con Django Rest Framework y MySQL 🚀

## 1. Instalar Django y DRF

Ejecuta el siguiente comando para instalar Django, DRF y el conector de MySQL:

```sh
pip install django djangorestframework mysqlclient
```


## 2. Crear el Proyecto y la Aplicación

```sh
django-admin startproject crud_api
cd crud_api
django-admin startapp contactos
```

```sh
pip install django
pip install djangorestframework
pip install mysqlclient 
pip install django-cors-headers
```


## 3. Configurar la Base de Datos en `settings.py`

Edita `crud_api/settings.py` y agrega la configuración para MySQL:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'crud_full_stack_react_mysql_python',
        'USER': 'root',
        'PASSWORD': 'tu_contraseña',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'contactos',
]
```


## 4. Definir el Modelo en `models.py`

Edita `contactos/models.py`:

```python
from django.db import models

class Contacto(models.Model):
    nombre = models.CharField(max_length=255)
    profesion = models.CharField(max_length=255)
    edad = models.IntegerField()
    habla_ingles = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre
```

Ejecuta las migraciones:

```sh
python manage.py makemigrations contactos
python manage.py migrate
```


## 5. Crear el Serializador en `serializers.py`

Crea el archivo `contactos/serializers.py`:

```python
from rest_framework import serializers
from .models import Contacto

class ContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacto
        fields = '__all__'
```


## 6. Crear las Vistas Basadas en Funciones en `views.py`

Edita `contactos/views.py`:

```python
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Contacto
from .serializers import ContactoSerializer

@api_view(['GET'])
def listar_contactos(request):
    contactos = Contacto.objects.all()
    serializer = ContactoSerializer(contactos, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def crear_contacto(request):
    serializer = ContactoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def detalle_contacto(request, id):
    try:
        contacto = Contacto.objects.get(pk=id)
        serializer = ContactoSerializer(contacto)
        return Response(serializer.data)
    except Contacto.DoesNotExist:
        return Response({"error": "No encontrado"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
def actualizar_contacto(request, id):
    try:
        contacto = Contacto.objects.get(pk=id)
        serializer = ContactoSerializer(contacto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Contacto.DoesNotExist:
        return Response({"error": "No encontrado"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def eliminar_contacto(request, id):
    try:
        contacto = Contacto.objects.get(pk=id)
        contacto.delete()
        return Response({"mensaje": "Contacto eliminado"}, status=status.HTTP_204_NO_CONTENT)
    except Contacto.DoesNotExist:
        return Response({"error": "No encontrado"}, status=status.HTTP_404_NOT_FOUND)
```


## 7. Configurar las Rutas en `urls.py`

Crea `contactos/urls.py`:

```python
from django.urls import path
from .views import listar_contactos, crear_contacto, detalle_contacto, actualizar_contacto, eliminar_contacto

urlpatterns = [
    path('contactos/', listar_contactos, name="listar_contactos"),
    path('contactos/nuevo/', crear_contacto, name="crear_contacto"),
    path('contactos/<int:id>/', detalle_contacto, name="detalle_contacto"),
    path('contactos/<int:id>/actualizar/', actualizar_contacto, name="actualizar_contacto"),
    path('contactos/<int:id>/eliminar/', eliminar_contacto, name="eliminar_contacto"),
]
```

En `crud_api/urls.py`:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('contactos.urls')),
]
```


## 8. Probar la API

Ejecuta el servidor:

```sh
python manage.py runserver
```


## 9. Endpoints Disponibles
URL BASE: `http://127.0.0.1:8000`

| Método     | Endpoint                          | Descripción                |
| ---------- | --------------------------------- | -------------------------- |
| **GET**    | `/api/contactos/`                 | Listar todos los contactos |
| **POST**   | `/api/contactos/nuevo/`           | Crear un nuevo contacto    |
| **GET**    | `/api/contactos/{id}/`            | Obtener un contacto por ID |
| **PUT**    | `/api/contactos/{id}/actualizar/` | Actualizar un contacto     |
| **DELETE** | `/api/contactos/{id}/eliminar/`   | Eliminar un contacto       |