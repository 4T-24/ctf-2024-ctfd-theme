<template>
	<section class="Notifications">
		<h2 class="title"><span>Notifications</span></h2>
		<div v-for="notification in notifications" :key="notification.id" class="notification">
			<div class="title">{{notification.title}}</div>
			<div class="content">{{notification.content}}</div>
			<timeago class="date" :datetime="notification.date" :auto-update="60"/>
		</div>
		<div v-if="notifications.length === 0" class="no-notification">
			No notifications yet!
		</div>
	</section>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
	computed: {
		...mapGetters({
			notifications: 'notifications/getNotifications',
		}),
	},
	head() {
		return {
			title: 'Notifications - TSG CTF',
		};
	},
};
</script>

<style>
.Notifications {
	& > .title {
		margin-bottom: 5rem;
	}

	.notification {
		width: 100%;
		max-width: 50rem;
		background: rgba(255, 255, 255, 0.2);
		box-shadow: 0 0 8px black;
		position: relative;
		color: white;
		margin: 1rem auto;
		padding: 0.8rem 10rem 1rem 1rem;
		box-sizing: border-box;
		border-radius: 3px;

		.title {
			font-size: 2rem;
		}

		.date {
			position: absolute;
			bottom: 1rem;
			right: 1rem;
		}
	}

	.no-notification {
		text-align: center;
		font-size: 2.5rem;
		font-family: 'Fredoka One', cursive;
		font-weight: 300;
		padding: 0;
		line-height: 2rem;
	}
}
</style>