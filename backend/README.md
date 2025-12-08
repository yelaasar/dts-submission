# Backend API

Django REST Framework API for task management.

## Setup

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install django djangorestframework
python manage.py makemigrations tasks
python manage.py migrate
python manage.py runserver  # http://127.0.0.1:8000
```

## API Endpoints

### Create Task

**POST** `/api/tasks`

Creates a new task.

**Request Body**

```json
{
    "title": "Finish the challenge README",
    "description": "Document the API endpoints",
    "status": "IN_PROGRESS",
    "due_datetime": "2025-12-10T12:00:00Z"
}
```

**Fields**
- `title` (string, required) - Min 2 characters
- `description` (string, optional) - Task description
- `status` (string, optional) - One of: `TODO`, `IN_PROGRESS`, `DONE` (default: `TODO`)
- `due_datetime` (string, required) - ISO 8601 format (UTC)

**Responses**
- `201 Created` - Task created successfully
- `400 Bad Request` - Validation errors
- other

## Testing

```bash
python manage.py test tasks
```