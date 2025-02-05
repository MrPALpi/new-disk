<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'

interface Props {
  name: string
}

const props: Props = defineProps<{
  name: string
}>()

const dinamicIcon = computed(() =>
  defineAsyncComponent(() => import(`../assets/icons/${props.name}-icon.vue`)),
)
</script>

<template>
  <component :is="dinamicIcon" />
</template>

<style lang="scss" scoped>
.v-icon {
  display: inline-block;
}
</style>
