<template>
    <div id="pagepanel">
        <Index id='info'/>
    </div>
</template>

<script>
import Index from './Index.vue'
import InfoBlock from './InfoBlock.vue'
import Vue from 'vue'

export default {
    name: 'PagePanel',
    components: {
        Index
    },
    data: function() {
        return {
            slogan: 'Nothing selected'
        }
    },
    mounted: function() {
        this.$bus.on('select', (msg) => {
            const panel = document.getElementById('panel');
            this.slogan = msg;
            const infoConstructor = Vue.extend(InfoBlock);
            const info = new infoConstructor();
            info.$set(info, 'slogan', msg);
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