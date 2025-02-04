<script setup lang="ts">
import { SvgIcon } from '@/shared/ui'
</script>

<template>
  <div class="home">
    <div class="home__text">
      <h1 class="home__text-title title-h1">
        Мои<br />
        заметки
      </h1>

      <h2 class="home__text-subtitle title-h3">
        Не&nbsp;забывай о&nbsp;важном,<br class="hide-on-mobile" />
        храни его в&nbsp;облаке.
      </h2>
    </div>
    <svg-icon name="miniature" class="home__logo" />
  </div>
</template>

<style lang="scss" scoped>
.home {
  @include flex-list();

  & {
    height: calc(100vh - 96px);
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 40px;
    text-align: center;
    align-items: center;
  }

  @include to-laptop {
    justify-content: space-between;
    height: calc(100vh - 136px);
    text-align: left;
    flex-wrap: nowrap;
  }
}

.home__text {
  @include flex-column;

  & {
    gap: 20px;
    flex: 1 1 auto;
  }

  @include tablet-up {
    gap: 40px;
  }
}

.home__text-subtitle {
  color: $gray;
}

.home__logo {
  flex: 1 1 829px;
  max-height: 100%;
  align-self: flex-end;
}
</style>
