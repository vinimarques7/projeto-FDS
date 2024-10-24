# Generated by Django 5.1.1 on 2024-09-29 03:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('which_teacher_app', '0004_remove_professor_confirma_senha'),
    ]

    operations = [
        migrations.AddField(
            model_name='professor',
            name='celular',
            field=models.CharField(default=0, max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='professor',
            name='comunicacao',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='professor',
            name='genero',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='professor',
            name='materia',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='professor',
            name='nivel_ensino',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='professor',
            name='nome',
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='professor',
            name='recebimento',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]