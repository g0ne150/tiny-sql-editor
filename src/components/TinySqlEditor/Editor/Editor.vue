<script setup lang="ts">
import { computed } from "vue";
import Line from "./Line.vue";
import Cursor from "./Cursor.vue";


const props = defineProps<{ text?: string }>()

const lines = computed(() => props.text?.split('\n'))

</script>

<template>
    <div class="container mx-auto h-80 overflow-auto">
        <div class="min-h-full cursor-text font-mono">
            <div class="relative border">
                <Line
                    v-for="(line, index) in lines"
                    :text="line"
                    :y-index="index"
                    @on-change="value => console.log(value)"
                />
                <Cursor :x-index="12" :y-index="2" />
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
