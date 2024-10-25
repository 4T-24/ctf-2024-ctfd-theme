<template>
	<a v-if="isStatic || isHref" :href="to">
		<slot/>
	</a>
	<nuxt-link v-else :to="to">
		<slot/>
	</nuxt-link>
</template>

<script>
import {mapState} from 'vuex';

export default {
	props: {
		to: {
			required: true,
			type: String,
		},
		isHref: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		...mapState(['isStatic']),
	},
};
</script>
