<script setup lang="ts">
import { ref } from "vue";


const props = defineProps<{ sql?: string }>()

const currentText = ref(props.sql || "")
const lines = [
    {
        text: "select * from xxx;",
        tokens: [
            { text: "select", className: "text-blue-700" },
            { text: " * ", className: "" },
            { text: "from", className: "text-blue-700" },
            { text: " xxx", className: "" },
            { text: ";", className: "" },
        ]
    },
    {
        text: "select * from xxx;",
        tokens: [
            { text: "select", className: "text-blue-700" },
            { text: " * ", className: "" },
            { text: "from", className: "text-blue-700" },
            { text: " xxx", className: "" },
            { text: ";", className: "" },
        ]
    }
]
</script>

<template>
    <div class="container mx-auto h-80 overflow-auto">
        <div class="min-h-full cursor-text font-mono">
            <div class="view-line" v-for="line in lines">
                <span v-for="token in line.tokens" :class="token.className">{{ token.text }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
