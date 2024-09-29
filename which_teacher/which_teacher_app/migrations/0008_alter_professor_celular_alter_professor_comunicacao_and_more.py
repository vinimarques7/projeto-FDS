# Generated by Django 5.1 on 2024-09-29 06:09

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('which_teacher_app', '0007_professor_genero'),
    ]

    operations = [
        migrations.AlterField(
            model_name='professor',
            name='celular',
            field=models.CharField(max_length=15),
        ),
        migrations.AlterField(
            model_name='professor',
            name='comunicacao',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='professor',
            name='genero',
            field=models.CharField(max_length=10),
        ),
        migrations.AlterField(
            model_name='professor',
            name='materia',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='professor',
            name='nivel_ensino',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='professor',
            name='nome',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='professor',
            name='recebimento',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='professor',
            name='senha',
            field=models.CharField(max_length=100),
        ),
        migrations.CreateModel(
            name='Horario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dia', models.CharField(max_length=10)),
                ('horario', models.TimeField()),
                ('professor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='horarios', to='which_teacher_app.professor')),
            ],
        ),
    ]
