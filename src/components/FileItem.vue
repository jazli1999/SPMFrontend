<template>
    <div id="fileitem">
        <el-row>
            <el-divider direction="vertical"></el-divider>
            <label style="display: inline-block; width:50px; line-height: 35px; text-align: center;"> {{ index+1 }} </label>
            <el-divider direction="vertical"></el-divider>
            <el-form :inline="true" class="demo-form-inline" style="display:inline">
                <el-form-item style="width: 255px; text-align: center">
                    <el-upload action="self-define" class="upload-demo" :http-request="selectFile" :limit="1">
                        <el-button size="small" type="primary">选择文件</el-button>
                    </el-upload>
                </el-form-item>
                <el-divider direction="vertical"></el-divider>
                <el-form-item style="width: 180px; text-align: center">
                    <el-input v-model.number="code" style="width: 100px" @change="update" placeholder="e.g. 336"></el-input>
                </el-form-item>
                <el-divider direction="vertical"></el-divider>
                <el-form-item style="width: 250px; text-align: center">
                    <el-upload action="self-define" class="upload-demo" :http-request="selectPic" :limit="1">
                        <el-button size="small">选择图片</el-button>
                    </el-upload>
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
            code: this.MSCode,
            pic: this.mPic
        }
    },
    methods: {
        selectFile: function(item) {
            this.file = item.file;
            this.update();
        },
        selectPic: function(item) {
            this.pic = item.file;
            this.update();
        },
        deleteItem: function () {
            this.$emit('deleteFileItem', this.index);
        },
        update: function() {
            this.$emit('updateData', {index: this.index, fileValue: this.file, picValue: this.pic, codeValue: this.code});
            console.log('a');
        }
    }
}
</script>

<style scoped>

</style>