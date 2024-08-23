# Generated by Django 5.0.6 on 2024-07-31 20:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0004_userform_password'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='service',
            name='main_content',
        ),
        migrations.CreateModel(
            name='ServiceDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='details', to='myapp.service')),
            ],
        ),
    ]