<script setup lang="ts">
import { shallowRef } from 'vue'
import { UserInfo, useUserStore } from '@/entites/user'
import { NavBar } from '@/widgets/nav-bar'
import { EntryForm } from '@/widgets/entry-form'
import { VModal, VButton } from '@/shared/ui'

const userStore = useUserStore()
const show = shallowRef<boolean>(false)
</script>

<template>
  <nav-bar>
    <template #right>
      <user-info v-if="userStore.isAuth" />
      <v-button v-else label="Войти" icon="login" @click="show = true" />
    </template>
  </nav-bar>

  <main class="container">
    <slot />
  </main>

  <v-modal v-model="show">
    <entry-form @close="show = false" />
  </v-modal>
</template>

<style scoped lang="scss"></style>
