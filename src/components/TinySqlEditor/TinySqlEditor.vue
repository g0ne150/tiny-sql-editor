<script setup lang="ts">
import Editor from "./Editor/Editor.vue";
import ResultTable from "./ResultTable/ResultTable.vue";

const props = defineProps<{ text?: string }>()

</script>

<template>
    <div class="container mx-auto">
        <Editor :text="props.text" />
        <input class="" type="button" value="查询" />
        <ResultTable />
    </div>
</template>

<style scoped>
</style>
