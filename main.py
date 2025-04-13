from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import TodoCreate

app = FastAPI()

# Allow frontend on Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage (for development)
todos = []
id_counter = 1

@app.get("/todos")
def get_todos():
    return todos

@app.post("/todos")
def create_todo(todo: TodoCreate):
    global id_counter
    new_todo = {
        "id": id_counter,
        "text": todo.text,
        "completed": todo.completed
    }
    todos.append(new_todo)
    id_counter += 1
    return new_todo

@app.put("/todos/{todo_id}")
def update_todo(todo_id: int, updated: TodoCreate):
    for todo in todos:
        if todo["id"] == todo_id:
            todo["text"] = updated.text
            todo["completed"] = updated.completed
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    global todos
    todos = [todo for todo in todos if todo["id"] != todo_id]
    return {"message": "Todo deleted"}
