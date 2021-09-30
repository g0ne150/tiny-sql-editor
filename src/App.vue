<script setup lang="ts">
import TinySqlEditor from "./components/TinySqlEditor/TinySqlEditor.vue";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

</script>

<template>
    <TinySqlEditor
        text=" -- 支持中文
select * from employee;
"
    />
</template>

<style>
</style>
