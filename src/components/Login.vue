<template>
    <span id="login" style="width: 120px; height: 60px; float:right">
       <el-button type="primary" style="position: absolute; top: 50%; margin: -15px 0 0 0" @click="login()">
           管理员登录
        </el-button>
    </span>
</template>

<script>
export default {
    name: 'Login',
    methods: {
        login() {
            let cur = sessionStorage.getItem("admin");
			sessionStorage.setItem("admin", Number(!Number(cur)));
			document.location.reload();
        }
    }
}
</script>

<style scoped>

</style>