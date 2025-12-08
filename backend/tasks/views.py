from django.shortcuts import render

from rest_framework import generics
from .models import Task
from .serializers import TaskSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

# Create your views here.


class TaskAPI(generics.GenericAPIView):
    permission_classes = [AllowAny]

    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    # Overiding built-in method
    def post(self, request):
        """
        Creates a new Task

        Expected JSON data:
        - title: string (required)
        - description: string (optional)
        - status: "TODO", "IN_PROGRESS", "DONE"
        - due_datetime: ISO 8601 datetime string (UTC)
        """
        serializer = TaskSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)

    # def get(self):
    #     pass

    # def put(self):
    #     pass

    # def patch(self): # ??
    #     pass

    # def delete(self):
    #     pass