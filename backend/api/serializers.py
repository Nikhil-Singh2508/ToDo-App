from rest_framework import serializers
from .models import TodoTask
from django.contrib.auth.models import User
class ToDoTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoTask
        fields = ['id','name', 'description', 'completed','user']
        extra_kwargs = {
            'user': {'read_only': True}
        }

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        # Hash the password before saving
        user.set_password(validated_data['password'])
        user.save()
        return user