<template>
    <div id="disasterprediction">
        <el-card class="box-card" style="padding: 15px; border-radius: 15px">
            <div slot="header" class="clearfix" style="text-align: center">
                <h3>灾情预测</h3>
                <el-button style="font-size:10pt" type="text" @click="refreshData">刷新数据</el-button>
            </div>
            <div style="align-content:center">
                <el-table stripe :data="data" v-show="showData" >
                    <el-table-column type="expand" >
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="情况描述">
                                    <span>{{ props.row.note }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="编码" width="100px" />
                    <el-table-column prop="date" label="上报时间" />
                    <el-table-column prop="location" label="地点" />
                    <el-table-column prop="longitude" label="经度" />
                    <el-table-column prop="latitude" label="纬度" />
                    <el-table-column prop="depth" label="深度" />
                    <el-table-column prop="magnitude" label="震级" />
                    <el-table-column prop="intensity" label="烈度" />
                    <el-table-column prop="type" label="类型" />
                    <el-table-column prop="reportingunit" label="上报单位"/>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'DisasterPrediction',
    data: function () {
        return {
            url: '',
            showData: false,
            data: []
        }
    },
    mounted: function () {
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

            axios.get("/api/disaster/DisasterPrediction")
            .then(function (response) {
                _this.updateData(response.data);
                _this.showData = true;
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                console.log('Finished');
            });
        }
    }

}
</script>

<style>
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>