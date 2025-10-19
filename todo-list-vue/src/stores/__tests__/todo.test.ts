import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTodoStore } from '../todo'

// Mock do fetch
global.fetch = vi.fn()

function createFetchResponse(data: any) {
  return {
    ok: true,
    json: async () => data,
  }
}

describe('Todo Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('deve inicializar com estado vazio', () => {
    const store = useTodoStore()
    expect(store.todos).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBe(null)
  })

  it('deve buscar todos com sucesso', async () => {
    const mockTodos = [{ id: 1, title: 'Test Todo', completed: false }]

    ;(global.fetch as any).mockResolvedValueOnce(createFetchResponse(mockTodos))

    const store = useTodoStore()
    await store.fetchTodos()

    expect(store.todos).toEqual(mockTodos)
    expect(store.loading).toBe(false)
    expect(store.error).toBe(null)
  })

  it('deve adicionar um novo todo', async () => {
    const newTodo = { id: 1, title: 'New Todo', completed: false }

    ;(global.fetch as any).mockResolvedValueOnce(createFetchResponse(newTodo))

    const store = useTodoStore()
    await store.addTodo('New Todo')

    expect(store.todos).toHaveLength(1)
    expect(store.todos[0]).toEqual(newTodo)
  })

  it('deve alternar o status de um todo', async () => {
    const store = useTodoStore()
    store.todos = [{ id: 1, title: 'Test', completed: false }]
    ;(global.fetch as any).mockResolvedValueOnce(
      createFetchResponse({ id: 1, title: 'Test', completed: true }),
    )

    await store.toggleTodo(1)

    expect(store.todos[0].completed).toBe(true)
  })

  it('deve deletar um todo', async () => {
    const store = useTodoStore()
    store.todos = [
      { id: 1, title: 'Test 1', completed: false },
      { id: 2, title: 'Test 2', completed: false },
    ]
    ;(global.fetch as any).mockResolvedValueOnce(createFetchResponse({}))

    await store.deleteTodo(1)

    expect(store.todos).toHaveLength(1)
    expect(store.todos[0].id).toBe(2)
  })

  it('deve tratar erros ao buscar todos', async () => {
    ;(global.fetch as any).mockResolvedValueOnce({
      ok: false,
    })

    const store = useTodoStore()
    await store.fetchTodos()

    expect(store.error).toBeTruthy()
    expect(store.loading).toBe(false)
  })

  it('deve calcular a contagem de todos completos corretamente', () => {
    const store = useTodoStore()
    store.todos = [
      { id: 1, title: 'Test 1', completed: true },
      { id: 2, title: 'Test 2', completed: false },
      { id: 3, title: 'Test 3', completed: true },
    ]

    expect(store.completedCount()).toBe(2)
    expect(store.totalCount()).toBe(3)
  })
})
