# PIT4-TodoList-FASTAPI

LIVE LINKS:
 FRONTEND: https://pit4-todo-list-fastapi.netlify.app/
 BACKEND: https://pit4-todolist-fastapi.onrender.com

 Backend API Endpoints:
 POST https://pit4-todolist-fastapi.onrender.com/docs#/default/create_task_tasks_post
 GET: https://pit4-todolist-fastapi.onrender.com/docs#/default/get_tasks_tasks_get
 PUT: https://pit4-todolist-fastapi.onrender.com/docs#/default/update_task_tasks__task_id__put
 DELETE: https://pit4-todolist-fastapi.onrender.com/docs#/default/delete_task_tasks__task_id__delete

# To-Do List App with FastAPI

A simple backend API for managing a To-Do List using **FastAPI**. This app supports full CRUD operations, task filtering, and dark mode integration, with the frontend built in **React**.

Setup Instructions

1. Clone the Repository
Start by cloning the repository to your local machine:

git clone https://github.com/Jayrille/PIT4-TodoList-FASTAPI.git
cd PIT4-TodoList-FASTAPI

2. Create and Activate a Virtual Environment
Create a virtual environment to manage the project’s dependencies:
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

4. Install Dependencies
Install the required Python dependencies using pip: pip install -r requirements.txt

4. Start the Development Server
Run the FastAPI server using Uvicorn: uvicorn main:app --reload

6. Open the API Documentation
Once the server is running, open your browser and visit: https://pit4-todolist-fastapi.onrender.com
This will allow you to interact with the API via Swagger UI.

🌐 API Endpoints
Base URL: https://pit4-todolist-fastapi.onrender.com/docs
🔹 GET /tasks/
Description: Retrieve a list of all tasks. Response:

  {
    "id": 1,
    "text": "Doing Assignments",
    "completed": false
  }
]
🔹 GET /tasks/{id}
Description: Retrieve a specific task by its ID. Response:

{
  "id": 1,
  "text": "Doing Assignments",
  "completed": false
}
🔹 POST /tasks/
Description: Create a new task. Request:
{
  "text": "New Task",
  "completed": false
}
Response:

{
  "id": 2,
  "text": "New Task",
  "completed": false
}
🔹 PUT /tasks/{id}
Description: Update an existing task. Request:

{
  "text": "Updated Task",
  "completed": true
}

Response:
{
  "id": 2,
  "text": "Updated Task",
  "completed": true
}

DELETE /tasks/{id}
Description: Delete a task by ID. Response:
{
  "id": 2,
  "text": "Updated Task",
  "completed": true
}
🔹 GET /tasks/filter/{status}
Description: Filter tasks by their completion status (completed or pending). 
Response (for completed tasks):
  {
    "id": 1,
    "text": "Example Task",
    "completed": true
  }
]
