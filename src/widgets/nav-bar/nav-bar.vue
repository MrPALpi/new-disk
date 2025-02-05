<script setup lang="ts">
import { VIcon } from '@/shared/ui'
</script>

<template>
  <div class="nav-bar container">
    <router-link to="/" class="nav-bar__home-link">
      <v-icon name="logo" class="nav-bar__logo" />
    </router-link>

    <div class="nav-bar__right">
      <slot name="right"> </slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.nav-bar {
  @include flex-row;

  & {
    padding-top: 20px;
    padding-bottom: 20px;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }

  @include desktop-up {
    padding-top: 40px;
    padding-bottom: 40px;
  }
}

.nav-bar__logo {
  width: 100%;
  color: $green-light;
}

.nav-bar__home-link {
  flex: 0 1 154px;
  display: block;
  max-height: 50px;

  @include tablet-up {
    flex-basis: 218px;
  }
}
</style>
