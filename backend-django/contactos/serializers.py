from rest_framework import serializers
from .models import Contacto

class ContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacto
        fields = 'id', 'nombre', 'profesion', 'edad', 'habla_ingles'
        # fields = '__all__'