from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Contacto
from .serializers import ContactoSerializer
from .renombrar_img import asignar_nombre_aleatorio

@api_view(['GET'])
def listar_contactos(request):
    contactos = Contacto.objects.all()
    serializer = ContactoSerializer(contactos, many=True)
    return Response(serializer.data)

"""
@api_view(['POST'])
def crear_contacto(request):
    serializer = ContactoSerializer(data=request.data)
    print(request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
"""

@api_view(['POST'])
def crear_contacto(request):
    data = request.data.copy()  # Copia mutable de los datos

    imagen = request.FILES.get('foto_contacto')
    if imagen:
        data['foto_contacto'] = asignar_nombre_aleatorio(imagen)  # Asignar nuevo nombre

    serializer = ContactoSerializer(data=data)
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
        
        # Copia mutable de los datos del request
        data = request.data.copy()

        # Si se envía una nueva imagen, asignarle un nombre aleatorio
        imagen = request.FILES.get("foto_contacto")
        if imagen:
            data["foto_contacto"] = asignar_nombre_aleatorio(imagen)

        serializer = ContactoSerializer(contacto, data=data, partial=True)  # `partial=True` permite actualizar solo algunos campos
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except Contacto.DoesNotExist:
        return Response({"error": "No encontrado"}, status=status.HTTP_404_NOT_FOUND)



"""
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
"""


@api_view(['DELETE'])
def eliminar_contacto(request, id):
    try:
        contacto = Contacto.objects.get(pk=id)
        contacto.delete()
        return Response({"mensaje": "Contacto eliminado"}, status=status.HTTP_204_NO_CONTENT)
    except Contacto.DoesNotExist:
        return Response({"error": "No encontrado"}, status=status.HTTP_404_NOT_FOUND)
