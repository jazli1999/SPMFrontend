<template>
    <div id="peopleinfo">
        <el-card class="box-card" style="padding: 15px; border-radius: 15px">
            <div slot="header" class="clearfix" style="text-align: center">
                <h3>人员伤亡及失踪</h3>
                <el-button style="font-size:10pt" type="text" @click="refreshData">刷新数据</el-button>
            </div>
             <div style="align-content: center">
                <el-table stripe :data="data" v-show="showData" >
                    <el-table-column prop="id" label="编码" width="100px" />
                    <el-table-column prop="date" label="上报时间" /> 
                    <el-table-column prop="location" label="死亡地点" />
                    <el-table-column prop="number" label="死亡人数" />
                    <el-table-column prop="reportingunit" label="上报单位" />
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'PeopleInfo',
    data: function() {
        return {
            url: '',
            showData: false,
            data: []
        }
    },
    mounted: function (rawData) {
        this.refreshData();
    },
    methods: {
        updateData: function (rawData) {
            const strData = rawData.split('}');
            strData.pop();
            this.data = [];
            for (let i in strData) {                
                this.data[i] = JSON.parse(strData[i] + '}');   
            }
        },
        refreshData: function () {
            var _this = this;
            const axios = require('axios');

            axios.get("/api/disaster/DeathStatistics")
            .then(function (response) {
                _this.updateData(response.data);
                _this.showData = true;
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                console.log('PeopleInfo Finished');
            });
        }
    }
}
</script>

<style scoped>

</style>