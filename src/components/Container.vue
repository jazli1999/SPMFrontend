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
				<el-menu-item :index="routes[8].path" >{{ routes[8].name }}</el-menu-item>
				<login />
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
import Login from './Login'

export default {
	name: 'Container',
	components: {
		'login': Login
	},
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
	created: function() {
		if(sessionStorage.getItem("admin") === null) {
			sessionStorage.setItem("admin", 0);
		}
	},
	mounted: function () {
		localStorage.setItem('admin', false);
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
		login () {
			console.log(this.admin);
			this.crud.admin = !this.crud.admin;
			console.log(this.admin);
		}
	},
}
</script>

<style scoped>

</style>