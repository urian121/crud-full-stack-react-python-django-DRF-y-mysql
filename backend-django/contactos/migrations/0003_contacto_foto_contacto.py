# Generated by Django 5.1.6 on 2025-02-14 21:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contactos', '0002_alter_contacto_options_alter_contacto_table'),
    ]

    operations = [
        migrations.AddField(
            model_name='contacto',
            name='foto_contacto',
            field=models.ImageField(blank=True, null=True, upload_to='fotos_contactos/'),
        ),
    ]
