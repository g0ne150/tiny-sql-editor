<script setup lang="ts">
import { computed, ref } from "vue";
import Line from "./Line.vue";
import Cursor from "./Cursor.vue";


const props = defineProps<{ text?: string }>()

const lines = computed(() => props.text ? props.text.split('\n') : [])

const curYIndex = ref(0)
const curXIndex = ref(0)

</script>

<template>
    <div class="container mx-auto h-80 overflow-auto mt-8">
        <div class="min-h-full">
            <div class="relative cursor-text border font-mono min-h-full rounded overflow-auto">
                <Line
                    v-for="(line, index) in lines"
                    :text="line"
                    :y-index="index"
                    @on-change="value => console.log(value)"
                />
                <Cursor :x-index="curXIndex" :y-index="curYIndex" />
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
