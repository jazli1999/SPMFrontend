<template>
    <div id="pagepanel">
        <Index id='info'/>
    </div>
</template>

<script>
import Index from './Index.vue'
import InfoBlock from './InfoBlock.vue'
import Vue from 'vue'
import QuakeInfo from './QuakeInfo'

export default {
    name: 'PagePanel',
    components: {
        Index
    },
    data: function() {
        return {
        }
    },
    mounted: function() {
        this.$bus.on('select', (entry) => {
            const panel = document.getElementById('panel');
            const infoConstructor = Vue.extend(QuakeInfo);
            const info = new infoConstructor();
            info.$set(info, 'url', entry.url);
            var infoElement = info.$mount();
            panel.removeChild(panel.childNodes.item(0));
            panel.appendChild(infoElement.$el);
        })
    }
}
</script>

<style scoped>
#pagepanel {
    margin: 40px;
}
</style>