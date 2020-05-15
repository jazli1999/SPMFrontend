<template>
    <div id="quakeinfo">
        <el-card class="box-card" style="padding: 15px; border-radius: 15px">
            <div slot="header" class="clearfix" style="text-align: center">
                <h3>地震灾情信息</h3>
                <el-button style="font-size:10pt" type="text" @click="refreshData">刷新数据</el-button>
            </div>
            <div style="align-content:center">
                <el-table stripe :data="data" v-show="showData" >
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="信息">
                                    <span>{{ props.row.note }}</span>
                                </el-form-item>
                            </el-form>
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="">
                                    <el-image :src="props.row.picture" fit="scale-down" />
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="id" label="编号" width="100px" >
                        <template slot-scope="row_scope">
                            <span v-if="row_scope.row.editting">
                                <el-input size="mini" placeholder="请输入内容" v-model="row_scope.row.id">
                                </el-input>
                            </span>
                            <span v-else>{{ row_scope.row.id }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="location" label="地点" />
                    <el-table-column align="center" sortable prop="grade" label="震级" width="80px"/>
                    <el-table-column align="center" sortable prop="date" label="日期时间" />
                    <el-table-column align="center" sortable prop="type" label="类型"/>
                    <el-table-column align="center" prop="reportingunit" label="上报单位"/>
                    <el-table-column align="center" v-if="admin">
                        <template slot="header" slot-scope="scope">
                            <el-button size="mini" type="primary" @click="handleAdd(scope.$index, scope.row)">添加一行</el-button>
                        </template>
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.editing" size="mini" @click="handleSave(scope.$index, scope.row)">保存</el-button>
                            <el-button v-else size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button v-if="scope.row.editing" size="mini" type="danger" @click="handleCancel(scope.$index, scope.row)">取消</el-button>
                            <el-button v-else size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            <!-- <span v-if="scope.row.editing" size="mini" @click="handleSave(scope.$index, scope.row)">保存</span>
                            <span v-else size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</span>
                            <span v-if="scope.row.editing" size="mini" type="danger" @click="handleCancel(scope.$index, scope.row)">取消</span>
                            <span v-else size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</span> -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'QuakeInfo',
    data: function () {
        return {
            url: '',
            showData: false,
            data: [],
            admin: true
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
                this.data[i].editing = false;
            }
        },
        refreshData: function () {
            var _this = this;
            const axios = require('axios');

            axios.get("/api/disaster/CommonDisaster")
            .then(function (response) {
                _this.updateData(response.data);
                _this.showData = true;
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                console.log('QuakeInfo Finished');
            });
        },
        handleEdit: function(index, content) {
            console.log(this.data[index].editing);
            this.data[index].editing = true;
            console.log(this.data[index].editing);
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