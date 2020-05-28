//map.vue

<template>          
    <div>
        <div id="mapContainer" style="width:600px; height:600px"></div>
    </div>
</template>
        
<script>
    import option from '../assets/map-option'  //引入配置项
    require('../assets/china')  //引入china.js地图文件

    export default {
        name: '',
        data () {
          return {  
          }
        },
        methods: {
          drawChinaMap() {
            var myChart = this.$echarts.init(document.getElementById('mapContainer'));
            myChart.setOption(option);
          }
        },
        mounted() {
          this.drawChinaMap();
        }
    }
</script>
        
<style scoped>
       
</style>