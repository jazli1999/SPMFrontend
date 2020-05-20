<template>
	<div id="peopleinfo">
		<h3>人员伤亡及失踪</h3>
		<DeathInfo />
		<MissingInfo style="margin-top: 50px;"/>
	</div>
</template>

<script>
import DeathInfo from './DeathInfo.vue'
import MissingInfo from './MissingInfo.vue'
export default {
	name: 'PeopleInfo',
	components: {
		MissingInfo,
		DeathInfo
	}
}
</script>

<style scoped>
</style>
