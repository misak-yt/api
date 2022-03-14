<template>
	<div>
		<label for="large">大区分：</label>
		<input type="text" name="large">
	</div>
</template>
<script>
export default {
	props: {
		large: String,
		middle: String,
		small: String
	}
}
</script>