# Generated by Django 4.0 on 2022-03-23 03:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Userapi', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='tokan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(default='', max_length=1000)),
                ('email', models.CharField(default='', max_length=100)),
            ],
        ),
    ]
