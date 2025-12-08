from rest_framework import serializers 
from .models import Task 


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Task
        fields = ['title', 'description', 'status', 'due_datetime']

    def validate_title(self, val):
        if len(val) < 2:
            raise serializers.ValidationError("Invalid Title")
        return val
    