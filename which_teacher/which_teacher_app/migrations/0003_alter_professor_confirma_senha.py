# Generated by Django 5.1.1 on 2024-09-28 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('which_teacher_app', '0002_remove_professor_id_prof_professor_confirma_senha_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='professor',
            name='confirma_senha',
            field=models.CharField(max_length=255),
        ),
    ]