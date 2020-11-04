<template>
  <transition name="slide" mode="out-in">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'slide-transition'
}
</script>

<style scoped>
  .slide-leave-active {
    transition: opacity 0.3s ease;
    opacity: 0;
    animation: slide-out 0.3s ease-in-out forwards;
  }

  .slide-leave {
    opacity: 1;
    transform: translateX(0);
  }

  @keyframes slide-out {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(30px);
    }
  }
</style>
