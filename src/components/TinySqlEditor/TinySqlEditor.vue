<script setup lang="ts">
import Editor from "./Editor/Editor.vue";
import ResultTable from "./ResultTable/ResultTable.vue";

const props = defineProps<{ text?: string }>()

</script>

<template>
    <Editor :text="props.text" />
    <ResultTable />
</template>

<style scoped>
</style>
