<script setup lang="ts">
const props = defineProps<{ name: string }>()
</script>

<template>
  <p>{{ `/hi/${props.name}.vue` }}</p>
</template>
