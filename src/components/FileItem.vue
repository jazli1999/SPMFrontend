<template>
    <div id="fileitem">
        <el-row>
            <el-divider direction="vertical"></el-divider>
            <label style="display: inline-block; width:50px; line-height: 35px; text-align: center;"> {{ index+1 }} </label>
            <el-divider direction="vertical"></el-divider>
            <el-form :inline="true" class="demo-form-inline" style="display:inline">
                <el-form-item style="width: 250px; text-align: center">
                    <el-upload action="self-define" class="upload-demo" :http-request="selectFile" :limit="1">
                        <el-button size="small" type="primary">选择文件</el-button>
                    </el-upload>
                </el-form-item>
                <el-divider direction="vertical"></el-divider>
                <el-form-item style="width: 180px; text-align: center">
                    <el-input v-model.number="code" style="width: 100px" placeholder="e.g. 336"></el-input>
                </el-form-item>
                <el-divider direction="vertical"></el-divider>
                <el-form-item style="width: 80px; text-align: center">
                    <el-button type="danger" :disabled="disable" icon="el-icon-delete" circle @click="deleteItem"></el-button>
                </el-form-item>
            </el-form>
            <el-divider direction="vertical"></el-divider>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'FileItem',
    props: {
        index: Number,
    },
    computed: {
        disable: function () {
            return this.index === 0;
        }
    },
    data: function () {
        return {
            file: this.myFile,
            code: this.MSCode
        }
    },
    watch: {
        code: function() {
            this.$emit('updateData', {index: this.index, fileValue: this.file, codeValue: this.code});
        }
    },
    methods: {
        selectFile: function(item) {
            this.file = item.file;
        },
        uploadFile(item) {
            var _this = this;
            
            const axios = require('axios');
            let formdata = new FormData();
            formdata.append('myFile', item.myFile);
            formdata.append('MSCode', this.code);

            axios({
                method: 'post',
                url: '/api/disaster/upload2',
                headers: {'content-type': 'multipart/form-data'},
                data: formdata
            }).then(function(response) {
                console.log(response);
            });
        },
        deleteItem: function () {
            this.$emit('deleteFileItem', this.index);
        }
    }
}
</script>

<style scoped>

</style>