<template>
  <div>
    <router-view key="router"></router-view>
  </div>
</template>
<style>
@media (prefers-color-scheme: dark) {
  /* body { background: #333; color: white; } */
}

@media (prefers-color-scheme: light) {
  body { background: #ddd; color: black; }
}
</style>