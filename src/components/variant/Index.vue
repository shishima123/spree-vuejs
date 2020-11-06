<template>
  <div class="col-9">
    <slide-transition>
      <router-view></router-view>
    </slide-transition>
  </div>
</template>

<script>
import SlideTransition from '../utils/slide-transition'

export default {
  name: 'VariantIndex',
  components: {SlideTransition}
}
</script>

<style scoped>

</style>
