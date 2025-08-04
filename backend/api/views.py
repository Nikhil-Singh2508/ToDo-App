from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import ToDoTaskSerializer, UserSerializer
from .models import TodoTask
from django.contrib.auth import authenticate 

@api_view(['GET', 'POST', "DELETE", "PUT"])
@permission_classes([IsAuthenticated])
def hello_world(req, id =None):
    if req.method == 'POST':
        serial = ToDoTaskSerializer(data = req.data)
        if serial.is_valid():
            serial.save(user = req.user)
            return Response({'msg': 'Task created successfully', 'data': serial.data})
        return Response({'error': serial.errors})

    if req.method == 'GET':
        if id is not None:
            try:
                task = TodoTask.objects.get(id =id, user=req.user)
                serial = ToDoTaskSerializer(task)
                return Response(serial.data)
            except:
                return Response({"error": "Task Not Found"})
        else:
            task = TodoTask.objects.filter(user= req.user)
            serial = ToDoTaskSerializer(task, many= True)
            return Response(serial.data)
    
    if req.method == "DELETE":
        try:
            task = TodoTask.objects.get(id = id, user=req.user)
            task.delete()
            return Response({"message": "Task removed"})
        except:
            return Response({"error": "Task not found"})
        
    if req.method == "PUT":
        try: 
            task = TodoTask.objects.get(id = id, user=req.user)
            serial = ToDoTaskSerializer(task, data = req.data, partial =True)
            if serial.is_valid():
                serial.save(user = req.user)
                return Response({"message": "Task Updated"})
            return Response({"errors": serial.errors})
        except:
            return Response({"errors": "Task not found"})


@api_view(['POST'])
def signup(req):
    if req.method == "POST":
        serial = UserSerializer(data = req.data)
        if serial.is_valid():
            serial.save()
            return Response({"msg": "User Registered", "status": True})
        return Response({"msg": "Registeration Failed","error":serial.errors, "status": False})
    
# @api_view(['POST'])
# def login(req):
#     username = req.data.get("username")
#     password = req.data.get("password")

#     user = authenticate(username=username, password=password)
#     if user is not None:
#         # Login success
#         return Response({"msg": "Login successful", "status": True})
#     else:
#         # Invalid credentials
#         return Response({"msg": "Login unsuccessful", "status": False})