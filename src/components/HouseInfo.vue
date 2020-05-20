<template>
</template>

<script>
</script>

<style>
</style>
<template>
	<div id="houseinfo">
		<CivilInfo style="margin-top: 50px;"/>
		<MasonryInfo />
	</div>
</template>

<script>
import MasonryInfo from './MasonryInfo.vue'
import CivilInfo from './CivilInfo.vue'
export default {
	name: 'HouseInfo',
	components: {
		MasonryInfo,
		CivilInfo
	}
}
</script>

<style scoped>
	
</style>