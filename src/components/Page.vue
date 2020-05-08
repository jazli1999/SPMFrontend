<template>
    <div id="page">
        <Nav id="nav" />
        <PagePanel id="panel" />
    </div>
</template>

<script>
import Nav from './Nav.vue'
import PagePanel from './PagePanel.vue'

export default {
    name: 'Page',
    components: {
        Nav,
        PagePanel
    },
}
</script>

<style scoped>
#nav {
  display: inline-block;
  margin: 0 10px;
}

#panel {
  display: inline-block;
  margin: 0 10px;
  vertical-align: top;
}
</style>