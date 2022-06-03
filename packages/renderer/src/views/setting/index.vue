<template>
	<DragReagon>
		<div class="container"></div>
	</DragReagon>
</template>

<script lang="ts" setup>
import DragReagon from '@/components/DragReagon.vue'
</script>

<style lang="scss" scoped>
.container {
	font-family: Alibaba, Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	height: 600px;
	background-color: #2c3e50;
	display: grid;
	grid-template-columns: 1fr 50px;
	border: 1px solid transparentize(white, 0.9);
	border-radius: 8px;
	align-items: center;
	box-shadow: 0 0 10px transparentize(black, 0.5);
}
</style>
