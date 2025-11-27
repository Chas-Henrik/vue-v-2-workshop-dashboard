<script setup lang="ts">
import SoundBoard from "./components/widgets/SoundBoard.vue";
import Card from "./components/ui/Card.vue";
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
	<SoundBoard />
</template>
