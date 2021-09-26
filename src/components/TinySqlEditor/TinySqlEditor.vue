<script setup lang="ts">
import Editor from "./Editor/Editor.vue";
import ResultTable from "./ResultTable/ResultTable.vue";

const props = defineProps<{ sql?: string }>()

</script>

<template>
    <Editor :sql="props.sql" />
    <ResultTable />
</template>

<style scoped>
</style>
