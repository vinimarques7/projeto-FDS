# Generated by Django 5.1.1 on 2024-09-29 01:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('which_teacher_app', '0003_alter_professor_confirma_senha'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='professor',
            name='confirma_senha',
        ),
    ]
