<template>
    <div id="container">
        <el-container>
            <el-aside id="nav" class="app-side app-side-left">
                <div class="app-aside-content">
                    <el-menu default-active="1" router class="el-menu-vertical-demo" 
								:collapse="isCollapse" @open="handleOpen">
                        	<el-menu-item v-for="route in routes" v-show="route.name" :key="route.path" :index="route.path" >
								<i :class="route.icon"></i>
								<span style="margin-left:15px; margin-right: 15px" slot="title">{{ route.name }}</span>
							</el-menu-item>
                    </el-menu>
                </div>
            </el-aside>

            <el-container>
                <el-header class="app-header">
					<div style="display: inline; width: 50px">
						<el-button :icon="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" circle 
									style="display: inline; font-size: 14pt; border: none;" @click="toggle" />
					</div>
					<div style="display: inline; text-align:center">
						<h1>{{ label }}</h1>
					</div>
                </el-header>
                <el-main class="app-body">
                    <div style="text-align:center">
                        <router-view/>
                    </div>
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
	  label: '多源异构灾情信息平台',
	  isCollapse: true
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
	toggle () {
		this.isCollapse = !this.isCollapse;
	}
  },
}
</script>

<style scoped>

</style>