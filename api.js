import todoData from './public/data.json';

// Function take all todo
export function getItems() {
  return todoData.items;
}

// Function add new todo
export function addItem(newTodo) {
  const nextId = Math.max(...todoData.items.map((item) => item.id), 0) + 1;
  const todo = {
    id: nextId,
    text: newTodo.text,
    is_complete: newTodo.is_complete || false,
  };
  todoData.items.push(todo);
}

// Function maj state of todo
export function updateItem(todoToUpdate) {
  const todo = todoData.items.find((item) => item.id === todoToUpdate.id);
  if (todo) {
    todo.is_complete = todoToUpdate.is_complete;
  }
}
