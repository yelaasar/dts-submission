from django.urls import path
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Task

class TaskAPITests(APITestCase):
    def setUp(self):
        self.url = '/api/tasks'

    def test_create_task_success(self):
        """
        Ensure we can create a new task object.
        """
        data = {
            'title': 'Unit tests',
            'description': 'Finish the unit tests',
            'status': 'IN_PROGRESS',
            'due_datetime': '2025-12-08T23:59:00Z'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 1)
        self.assertEqual(Task.objects.get().title, 'Unit tests')

    def test_create_task_invalid_data(self):
        """
        Ensure valid_title validation works.
        """
        data = {
            'title': '',  # Empty title should fail
            'description': 'hello',
            'status': 'TODO',
            'due_datetime': '2025-12-08T23:59:00Z'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_task_description_variations(self):
        """
        Ensure Description is an optional field
        """
        # Description set to empty String
        data = {
            'title': 'this is the title',
            'description': '',
            'status': 'IN_PROGRESS',
            'due_datetime': '2025-12-08T23:59:00Z'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Description set to None
        data = {
            'title': 'this is the title',
            'description': None,
            'status': 'IN_PROGRESS',
            'due_datetime': '2025-12-08T23:59:00Z'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Description left out
        data = {
            'title': 'this is the title',
            'status': 'IN_PROGRESS',
            'due_datetime': '2025-12-08T23:59:00Z'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)