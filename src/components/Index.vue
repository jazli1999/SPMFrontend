<template>
    <div id='index'>
        <h1>Index</h1>
        <el-card class="box-card" style="padding: 15px; border-radius: 15px; text-align: center">
            <el-link type="primary" style="font-size: 14pt" target="https://devcloud.huaweicloud.com/docman/project/e049f18d45a44befab1e6ab5168ce07e/docman/detail/3617201/list">
                点击访问平台操作手册</el-link>
            <p>平台操作手册内容目录</p>
            <el-tree :data="toc" :props="defaultProps" style="width: 220px; margin: auto" />
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'index',
    data () {
        return {
            toc: [
                {label: '管理员模式介绍'},
                {label: '增删改查功能提示',
                 children: [
                    {label: '增/删/改/查'},
                ]},
                {label: '上传文件作为数据源',
                 children: [
                     {label: '测试数据说明'}
                ]},
                {label: '数据导出功能',
                 children: [
                    {label: '用户提交数据导出请求'},
                    {label: '管理员处理数据导出请求'}
                ]}
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    }
}
</script>

<style scoped>

</style>