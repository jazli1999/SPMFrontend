<template>
    <div id="upload" style="text-align: center">
        <el-card class="box-card" style="border-radius: 12px; margin: 0 20px; padding: 8px"> 
            <div slot="header" class="clearfix">
                <el-row>
                    <el-divider direction="vertical"></el-divider>
                    <div style="display: inline-block; width: 40px; text-align: center"> # </div>
                    <el-divider direction="vertical"></el-divider>
                    <div style="display: inline-block; width: 260px; text-align: center"> 文件 </div>
                    <el-divider direction="vertical"></el-divider>
                    <div style="display: inline-block; width: 190px; text-align: center"> 编码 </div>
                    <el-divider direction="vertical"></el-divider>
                    <div style="display: inline-block; width: 80px; text-align: center"> 删除 </div>
                    <el-divider direction="vertical"></el-divider>
                </el-row>
            </div>
            <div class="text item">
                <FileItem v-for="(file, index) in files" :key="index" 
                    @updateData="updateData" @deleteFileItem="deleteItem" :index="index" />
                <el-divider style="margin: 0px"></el-divider>
                <div style="text-align:center">
                    <el-button @click="addItem">添加文件</el-button>
                    <el-button @click="submit">提交</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import FileItem from './FileItem.vue'

export default {
    name: 'Upload',
    components: {
        FileItem
    },
    data() {
        return {
            files: [{
                myFile: {},
                MSCode: ''
            }]
        };
    },
    methods: {
        addItem: function () {
            this.files.push({myFile: {}, MSCode: ''});
            console.log(this.files);          
        },
        deleteItem: function(index) {
            this.files.splice(index, 1);
        },
        submit: function() {
            var _this = this;
            for(const file of this.files) {
                const axios = require('axios');
                const formdata = new FormData();
                console.log(file.myFile);
                formdata.append('myFile', file.myFile);
                formdata.append('MSCode', file.MSCode);

                 axios({
                    method: 'post',
                    url: '/api/disaster/upload2',
                    headers: {'content-type': 'multipart/form-data'},
                    data: formdata})
                .then(function(response) {
                    if (response.data === 'success') {
                        _this.$message({
                            message: file.myFile.name + '上传成功',
                            type: 'success'
                        });
                    } else {
                        _this.$message({
                            message: file.myFile.name + '上传失败',
                            type: 'error'
                        });
                    }
                });
            }
            
            this.files = [{
                myFile: {},
                MSCode: ''
            }];
        },
        updateData: function(val) {
            let index = val.index;
            this.files[index].myFile = val.fileValue;
            this.files[index].MSCode = val.codeValue;
        }
    }
}
</script>

<style scoped>

</style>