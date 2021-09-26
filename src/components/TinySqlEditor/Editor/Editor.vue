<script setup lang="ts">
import { ref } from "vue";


const props = defineProps<{ sql?: string }>()

const currentText = ref(props.sql || "")
</script>

<template>
    <div class="container mx-auto h-80 overflow-auto">
        <div class="min-h-full cursor-text font-mono">{{ currentText }}</div>
    </div>
</template>

<style scoped>
</style>
