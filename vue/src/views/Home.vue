<template>
  <div>
    <h1 className="text-3xl font-bold underline">{{ test }}</h1>
  </div>
</template>

<script setup>
import store from "@/store";
import { computed } from "vue";

const test = computed(() => store.state.besar);
</script>

<style lang="scss" scoped></style>
