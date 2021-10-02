<script setup lang="ts">
import Editor from "./Editor/Editor.vue";
import ResultTable from "./ResultTable/ResultTable.vue";
import { executionRequest } from "./Api"
import { ref } from "@vue/reactivity";

const props = defineProps<{ modelValue: string }>()

const emits = defineEmits<{
    (e: "update:modelValue", value: string): void
}>()

let executeResult = ref('')

const doRequest = async () =>
    executeResult.value = await executionRequest(props.modelValue)

</script>

<template>
    <div class="container mx-auto">
        <Editor v-model="modelValue" />
        <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
            @click="doRequest"
        >Excute</button>
        <ResultTable :table-data="executeResult" />
    </div>
</template>

<style scoped>
</style>
