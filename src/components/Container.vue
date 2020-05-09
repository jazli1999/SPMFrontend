<template>
    <div id="container">
        <el-container>
            <el-aside id="nav" class="app-side app-side-left" width="20%">
                <div class="app-side-logo">
                    <img class="logo" src="@/assets/logo.png"/>
                </div>
                <div class="app-aside-content">
                    <el-menu default-active="1" router class="el-menu-vertical-demo" @open="handleOpen">
                        	<el-menu-item v-for="route in routes" v-show="route.name" :key="route.path" :index="route.path" >
								<i class="el-icon-menu"></i>
								<span slot="title">{{ route.name }}</span>
							</el-menu-item>
                    </el-menu>
                </div>
            </el-aside>

            <el-container>
                <el-header class="app-header">
                    <h1>{{ label }}</h1>
                </el-header>

                <el-main class="app-body">
                    <template>
                        <router-view/>
                    </template>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
  name: 'Container',
  data () {
    return {
      label: '多源异构灾情信息平台'
    }
  },
  computed: {
    // 获取route路由
    routes () {
      return this.$router.options.routes
    } 
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
    },
  },
}
</script>

<style scoped>
img {
	width: 80px;
	align-content: center
}
</style>