import { ref, computed } from 'vue'

interface Todo {
  id: number
  text: string
  completed: boolean
}

const todoArray = ref<Todo[]>([])

export function useTodos() {
  const deleteTodo = (id: number) => {
    todoArray.value = todoArray.value.filter((todo: Todo) => todo.id !== id)
  }

  const newTodoText = ref('')

  const addTodo = (text?: string) => {
    const todoText = text || newTodoText.value
    if (todoText.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: todoText,
        completed: false
      }
      todoArray.value.push(newTodo)
      newTodoText.value = ''
    }
  }

  const toggleTodo = (id: number) => {
    const todo = todoArray.value.find((todo: Todo) => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  const completedCount = computed(() => {
    return todoArray.value.filter((todo: Todo) => todo.completed).length
  })

  const totalCount = computed(() => {
    return todoArray.value.length
  })

  return {
    todos: todoArray,
    newTodoText,
    addTodo,
    deleteTodo,
    toggleTodo,
    completedCount,
    totalCount
  }
}
