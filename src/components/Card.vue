<template>
	<div class="card">
		<img :src=img alt="">
		<h5>{{ name }}</h5>
		<h5>{{ address }}</h5>
		<h5>{{ access }}</h5>
		<h5>{{ genre }}</h5>
		<h5>{{ memo }}</h5>
	</div>
</template>
<script>
export default {
	name: 'Card',
	props: {
		img: String,
		name: String,
		address: String,
		access: String,
		genre: String,
		memo: String
	}
}
</script>
<style scoped>
.card {
	width: 180px;
	height: 360px;
	padding: 25px 20px;

}
</style>