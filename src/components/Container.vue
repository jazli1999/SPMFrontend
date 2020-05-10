<template>
    <div id="container">
		<div>
			<el-menu :default-active="routes[1].path" router mode="horizontal"  @open="handleOpen">
				<el-menu-item :index="routes[1].path" >{{ routes[1].name }}</el-menu-item>
				<el-submenu index="2">
					<template slot="title">灾情信息</template>
  					<el-menu-item v-for="route in infoRoutes" :key="route.path" :index="route.path" >
						  {{ route.name }}
  					</el-menu-item>
				</el-submenu>
				<el-menu-item :index="routes[7].path" >{{ routes[7].name }}</el-menu-item>
			</el-menu>
		</div>

		<el-container>
			<el-main class="app-body">
				<div style="text-align:center">
					<router-view/>
				</div>
			</el-main>
		</el-container>
    </div>
</template>

<script>
export default {
  name: 'Container',
  data () {
    return {
	  label: '多源异构灾情信息平台',
    }
  },
  computed: {
    // 获取route路由
    infoRoutes () {
      return this.$router.options.routes.filter((item) => {
		  return item.show;
	  });
	},
	routes () {
		return this.$router.options.routes;
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