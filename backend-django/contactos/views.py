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
    data['foto_contacto'] = request.FILES.get('foto_contacto')  # Agregar la imagen

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
        
        # Convertimos los datos en un diccionario mutable
        data = request.data.copy()
        
        # Si se envió una nueva imagen, actualizarla en el objeto
        if "foto_contacto" in request.FILES:
            data["foto_contacto"] = request.FILES["foto_contacto"]
        
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
