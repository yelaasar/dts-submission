# dts-submission

Full-stack task management app with Django REST Framework backend and React frontend.

## Features

**Backend (Django REST Framework)**
- RESTful API for task creation (`POST /api/tasks`)
- Task model with title, description, status, and due date
- Server-side validation (title > 2 characters)
- Simple unit tests

**Frontend (React)**
- Form management with React hooks
- Client-side validation and data formatting (camelCase ↔ snake_case)
- Native fetch API integration
- Unit tested Task model

## Technologies

- **Backend:** Python 3.10+, Django, DRF, SQLite
- **Database:** SQLite (built into Django)
- **Frontend:** React, JavaScript ES6+

## Setup

### Backend
```bash
cd backend/
python -m venv venv
source venv/bin/activate 
pip install -r requirements.txt
python manage.py makemigrations tasks
python manage.py migrate
python manage.py runserver  # Runs at http://127.0.0.1:8000
```

### Frontend
```bash
cd frontend/
npm install
npm start  # Runs at http://localhost:3000
```

## Testing

**Backend:** `python manage.py test tasks`  
**Frontend:** `npm test`