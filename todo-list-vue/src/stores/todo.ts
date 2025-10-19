import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Todo {
  id: number
  title: string
  completed: boolean
}

export const useTodoStore = defineStore('todo', () => {
  // State
  const todos = ref<Todo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  async function fetchTodos() {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('http://localhost:3000/todos')
      if (!response.ok) throw new Error('Erro ao buscar tarefas')
      todos.value = await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Erro desconhecido'
      console.error('Erro ao buscar tarefas:', e)
    } finally {
      loading.value = false
    }
  }

  async function addTodo(title: string) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          completed: false,
        }),
      })
      if (!response.ok) throw new Error('Erro ao criar tarefa')
      const newTodo = await response.json()
      todos.value.push(newTodo)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Erro desconhecido'
      console.error('Erro ao criar tarefa:', e)
    } finally {
      loading.value = false
    }
  }

  async function toggleTodo(id: number) {
    const todo = todos.value.find((t) => t.id === id)
    if (!todo) return

    loading.value = true
    error.value = null
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      })
      if (!response.ok) throw new Error('Erro ao atualizar tarefa')
      todo.completed = !todo.completed
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Erro desconhecido'
      console.error('Erro ao atualizar tarefa:', e)
    } finally {
      loading.value = false
    }
  }

  async function deleteTodo(id: number) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Erro ao deletar tarefa')
      todos.value = todos.value.filter((t) => t.id !== id)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Erro desconhecido'
      console.error('Erro ao deletar tarefa:', e)
    } finally {
      loading.value = false
    }
  }

  // Getters
  const completedCount = () => todos.value.filter((t) => t.completed).length
  const totalCount = () => todos.value.length

  return {
    // State
    todos,
    loading,
    error,
    // Actions
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    // Getters
    completedCount,
    totalCount,
  }
})
