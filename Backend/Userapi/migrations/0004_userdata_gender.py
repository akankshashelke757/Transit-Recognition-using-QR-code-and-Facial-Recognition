# Generated by Django 4.0 on 2022-04-16 14:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Userapi', '0003_rename_mobno_userdata_dob_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdata',
            name='gender',
            field=models.CharField(default='', max_length=50),
        ),
    ]