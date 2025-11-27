<script setup lang="ts">
import SoundBoard from "./components/widgets/SoundBoard.vue";
import Card from "./components/ui/Card.vue";
import Todo from "./components/widgets/Todo.vue";
import { useTodos } from "./composables/useTodos";

const { todos, newTodoText, addTodo, deleteTodo, toggleTodo, completedCount, totalCount } = useTodos()

</script>
<template>
	<div>
		<h1>Vue Workshop 2</h1>
		<p>Slots, lifecycle och composables</p>
	</div>
	<Card variant="primary">
		<template #header>
			<h2>Sound Board</h2>
		</template>
		<template #footer>
			<p>Enjoy the sounds!</p>
		</template>
	</Card>
	<div class="todo-section">
		<div class="add-todo">
			<input 
				v-model="newTodoText"
				type="text" 
				placeholder="Add new todo..."
				class="todo-input"
				@keyup.enter="addTodo()"
			/>
			<button @click="addTodo()" class="add-button">Add Todo</button>
		</div>
		<p>Completed Todos: {{ completedCount }} / {{ totalCount }}</p>
		<div class="todo-list">
			<Todo 
				v-for="todo in todos" 
				:key="todo.id"
				:todo="todo"
				@delete="deleteTodo"
				@toggle="toggleTodo"
			/>
		</div>
	</div>
	<SoundBoard />
</template>

<style scoped>
.todo-input {
	flex: 1;
	padding: 0.75rem 1rem;
	font-size: 1rem;
	border: 2px solid #e5e7eb;
	border-radius: 6px;
	transition: border-color 0.2s ease;
}

.todo-input:focus {
	outline: none;
	border-color: #3b82f6;
}

.add-todo {
	margin-top: 1rem;
	display: flex;
	gap: 0.75rem;
	margin-bottom: 1.5rem;
}

.add-button {
	padding: 0.75rem 1.5rem;
	font-size: 1rem;
	font-weight: 600;
	background: #3b82f6;
	color: white;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	transition: background 0.2s ease;
	white-space: nowrap;
}

.add-button:hover {
	background: #2563eb;
}

.todo-list {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}
</style>
