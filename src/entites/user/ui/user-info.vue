<script setup lang="ts">
import { useUserStore } from '../model'
import { SvgIcon, VPopover } from '@/shared/ui'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const logout = () => {
  userStore.logout().then(() => {
    console.log('tets')
    router.push({ name: 'home' })
  })
}
</script>
<template>
  <v-popover :closeClickContent="true">
    <template #trigger>
      <div class="user-info">
        <span class="user-info__name text-small">{{ userStore.email }}</span>
        <svg-icon name="user" class="user-info__icon" />
      </div>
    </template>
    <template #content>
      <a class="exit" href="#" @click.prevent="logout">Выйти</a>
    </template>
  </v-popover>
</template>

<style scoped lang="scss">
.user-info {
  @include flex-list(12px);

  & {
    align-items: center;
    cursor: pointer;
  }
}

.user-info__name {
  flex: 1 1 215px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.exit {
  display: block;
  text-align: center;
}
</style>
