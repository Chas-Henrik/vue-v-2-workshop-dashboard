<script setup lang="ts">
interface Todo {
  id: number
  text: string
  completed: boolean
}

defineProps({
  todo: {
    type: Object as () => Todo,
    required: true
  }
})

const emit = defineEmits<{
  toggle: [id: number]
  delete: [id: number]
}>()
</script>

<template>
  <div class="todo" :class="{ 'todo--completed': todo.completed }">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="emit('toggle', todo.id)"
      class="todo-checkbox"
    />
    <span class="todo-text">{{ todo.text }}</span>
    <button @click="emit('delete', todo.id)" class="todo-delete">
      ✕
    </button>
  </div>
</template>

<style scoped>
.todo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.todo:hover {
  border-color: #3b82f6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.todo--completed {
  opacity: 0.6;
  background: #f9fafb;
}

.todo-checkbox {
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
  accent-color: #3b82f6;
  flex-shrink: 0;
}

.todo-text {
  flex: 1;
  font-size: 0.9375rem;
  color: #1f2937;
  line-height: 1.5;
}

.todo--completed .todo-text {
  text-decoration: line-through;
  color: #6b7280;
}

.todo-delete {
  padding: 0.25rem 0.5rem;
  background: transparent;
  border: none;
  color: #ef4444;
  font-size: 1.25rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s ease;
  flex-shrink: 0;
  line-height: 1;
}

.todo-delete:hover {
  background: #fee2e2;
}
</style>
