# Generated by Django 4.2.4 on 2023-09-10 09:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_chartdata'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='profile_image',
            field=models.ImageField(blank=True, null=True, upload_to='profile_images/'),
        ),
    ]
