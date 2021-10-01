<script setup lang="ts">
import Editor from "./Editor/Editor.vue";
import ResultTable from "./ResultTable/ResultTable.vue";

const props = defineProps<{ text?: string }>()

</script>

<template>
    <div class="container mx-auto">
        <Editor :text="props.text" />
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Excute</button>
        <ResultTable />
    </div>
</template>

<style scoped>
</style>
