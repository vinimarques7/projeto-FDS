# Generated by Django 5.1.1 on 2024-09-28 01:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='professor',
            fields=[
                ('id_prof', models.BigAutoField(primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=100)),
                ('senha', models.CharField(max_length=100)),
            ],
        ),
    ]
