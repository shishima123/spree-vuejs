<template>
  <div id="app">
    <slide-transition>
      <router-view/>
    </slide-transition>
  </div>
</template>

<script>
import SlideTransition from './components/utils/slide-transition'

export default {
  name: 'App',
  components: {SlideTransition}
}
</script>

<style>

</style>
