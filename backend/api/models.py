from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class TodoTask(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tasks")
    def __str__(self):
        return self.name