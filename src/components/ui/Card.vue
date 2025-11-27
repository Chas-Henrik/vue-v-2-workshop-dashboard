<script setup lang="ts">
defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value: string) => ['default', 'primary', 'success', 'danger'].indexOf(value) !== -1
  }
})
</script>

<template>
  <div class="card" :class="`card--${variant}`">
    <div class="card-header">
      <slot name="header">
        <h3 class="card-title">Card</h3>
      </slot>
    </div>
    <div class="card-content">
      <slot />
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.2s ease;
  border: 2px solid transparent;
}

.card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card--default {
  border-color: #e5e7eb;
}

.card--primary {
  border-color: #3b82f6;
}

.card--primary .card-header {
  background: #3b82f6;
  color: white;
}

.card--success {
  border-color: #10b981;
}

.card--success .card-header {
  background: #10b981;
  color: white;
}

.card--danger {
  border-color: #ef4444;
}

.card--danger .card-header {
  background: #ef4444;
  color: white;
}

.card-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.card-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
}

.card-content {
  padding: 1.5rem;
}

.card-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}
</style>
