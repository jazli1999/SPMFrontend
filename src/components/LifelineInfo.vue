<template>
	<div id="lifelineinfo">
		<h3>生命线工程</h3>
		<CommInfo />
		<TrafficInfo style="margin-top: 50px;"/>
	</div>
</template>

<script>
import CommInfo from './CommInfo.vue'
import TrafficInfo from './TrafficInfo.vue'
export default {
	name: 'LifelineInfo',
	components: {
		CommInfo,
		TrafficInfo
	}
}
</script>

<style scoped>
	
</style>