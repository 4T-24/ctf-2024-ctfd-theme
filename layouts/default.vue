<template>
	<div>
		<div class="header">
			<div class="title">
				<iso-link to="/">4T$ CTF 2024</iso-link>
			</div>
			<div class="spacer" />
			<div v-if="isLoggedIn">
				<div v-if="isMobile" class="menu">
					<div v-on-clickaway="onClickaway" class="menu-item dropdown">
						<div class="dropdown-trigger" @click="isDropping = !isDropping">
							<div class="teamname">
								{{ team && team.name }}
							</div>
						</div>
						<div
							v-if="isDropping"
							class="dropdown-menu"
							@click="onClickDropdown"
						>
							<iso-link to="/notifications" class="dropdown-menu-item"
								>Notifications</iso-link
							>
							<iso-link to="/about" class="dropdown-menu-item">About</iso-link>
							<iso-link to="/rules" class="dropdown-menu-item">Rules</iso-link>
							<iso-link to="/scoreboard" class="dropdown-menu-item"
								>Scoreboard</iso-link
							>
							<iso-link to="/challenges" class="dropdown-menu-item"
								>Challenges</iso-link
							>
							<iso-link
								v-if="!isStatic"
								:to="isInTeam ? `/teams/${team && team.id}` : '/team'"
								class="dropdown-menu-item"
							>
								Team
							</iso-link>
							<iso-link
								v-if="!isStatic"
								to="/settings"
								class="dropdown-menu-item"
							>
								Settings
							</iso-link>
							<a
								v-if="!isStatic"
								href="/logout"
								class="dropdown-menu-item"
								@click="logout"
							>
								Logout
							</a>
						</div>
					</div>
				</div>
				<div v-else class="menu">
					<div class="menu-item" v-if="isAdmin">
						<iso-link to="/admin" class="menu-item">Admin Panel</iso-link>
						<iso-link to="/notifications">Notifications</iso-link>
					</div>
					<div class="menu-item">
						<iso-link to="/about">About</iso-link>
					</div>
					<div class="menu-item">
						<iso-link to="/rules">Rules</iso-link>
					</div>
					<div class="menu-item" v-if="isStarted">
						<iso-link to="/scoreboard">Scoreboard</iso-link>
					</div>
					<div class="menu-item" v-if="isStarted">
						<iso-link to="/challenges">Challenges</iso-link>
					</div>
					<div
						v-if="!isStatic"
						v-on-clickaway="onClickaway"
						class="menu-item dropdown"
					>
						<div class="dropdown-trigger" @click="isDropping = !isDropping">
							<div class="teamname">
								{{ team && team.name }}
							</div>
						</div>
						<div
							v-if="isDropping"
							class="dropdown-menu"
							@click="onClickDropdown"
						>
							<iso-link
								:to="isInTeam ? `/teams/${team && team.id}` : '/team'"
								class="dropdown-menu-item"
								>Team</iso-link
							>
							<iso-link to="/settings" class="dropdown-menu-item"
								>Settings</iso-link
							>
							<a href="/logout" class="dropdown-menu-item" @click="logout"
								>Logout</a
							>
						</div>
					</div>
				</div>
			</div>
			<div v-else>
				<div v-if="isMobile" class="menu">
					<div v-on-clickaway="onClickaway" class="menu-item dropdown">
						<div class="dropdown-trigger" @click="isDropping = !isDropping">
							<div class="teamname">Menu</div>
						</div>
						<div
							v-if="isDropping"
							class="dropdown-menu"
							@click="onClickDropdown"
						>
							<iso-link to="/about" class="dropdown-menu-item">About</iso-link>
							<iso-link to="/rules" class="dropdown-menu-item">Rules</iso-link>
							<iso-link to="/scoreboard" class="dropdown-menu-item"
								>Scoreboard</iso-link
							>
							<iso-link to="/login" class="dropdown-menu-item">Login</iso-link>
							<iso-link to="/register" class="dropdown-menu-item"
								>Register</iso-link
							>
						</div>
					</div>
				</div>
				<div v-else class="menu">
					<div class="menu-item">
						<iso-link to="/about">About</iso-link>
					</div>
					<div class="menu-item">
						<iso-link to="/rules">Rules</iso-link>
					</div>
					<div class="menu-item">
						<iso-link to="/scoreboard" v-if="isStarted">Scoreboard</iso-link>
					</div>
					<div class="menu-item">
						<iso-link to="/login">Login</iso-link>
					</div>
					<div class="menu-item">
						<iso-link to="/register">Register</iso-link>
					</div>
				</div>
			</div>
		</div>
		<div class="root-content">
			<nuxt />
		</div>
		<div class="footer">
			<p>Made with ❤️ by Nathan</p>
		</div>
	</div>
</template>

<script>
// TODO: Trouver un meilleur fond d'écran

import IsoLink from '~/components/IsoLink.vue'
import { mapState } from 'vuex'
import { directive as onClickaway } from 'vue-clickaway'

export default {
	components: { IsoLink },
	directives: { onClickaway },
	data() {
		return {
			isDropping: false,
			isMobile: false,
		}
	},
	head() {
		return {
			title: 'TSG CTF',
		}
	},
	computed: {
		...mapState([
			'isStatic',
			'isLoggedIn',
			'isInTeam',
			'team',
			'user',
			'isAdmin',
			'isStarted',
		]),
	},
	async beforeMount() {
		await this.$store.dispatch('getDates', { $axios: this.$axios })
	},
	async mounted() {
		if (window.innerWidth <= 900) {
			this.isMobile = true
		}

		window.addEventListener('resize', () => {
			if (window.innerWidth <= 900) {
				this.isMobile = true
			} else {
				this.isMobile = false
			}
		})

		if (typeof this.$OneSignal !== 'undefined') {
			this.$OneSignal.isPushNotificationsEnabled().then((isEnabled) => {
				this.$store.commit('setIsPushEnabled', isEnabled)
			})
		}

		if (typeof globalThis.OneSignal !== 'undefined') {
			globalThis.OneSignal.getNotificationPermission().then((permission) => {
				if (permission === 'granted') {
					this.$store.commit('setIsPushEnabled', true)
				}
			})
		}

		if (navigator.language.includes('ja')) {
			this.$store.commit('setLanguage', 'ja')
		}
	},
	methods: {
		onClickaway() {
			this.isDropping = false
		},
		onClickDropdown(event) {
			if (event.target.tagName === 'A') {
				this.isDropping = false
			}
		},
		logout(event) {
			event.preventDefault()
			location.href = '/logout'
		},
	},
}
</script>

<style lang="postcss">
@import 'https://fonts.googleapis.com/css?family=Fredoka+One|Roboto:100';

html {
	font-family:
		'Source Sans Pro',
		-apple-system,
		BlinkMacSystemFont,
		'Segoe UI',
		Roboto,
		'Helvetica Neue',
		Arial,
		sans-serif;
	font-size: 16px;
	word-spacing: 1px;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	box-sizing: border-box;
	/*background-image: url('../static/background.svg'), radial-gradient(circle, #000000 0%, #000000 70%, #3f3f3f 100%);*/
	background-color: #151817;
	background-size: cover;
	background-position: center;
	background-attachment: fixed;
	color: white;
	height: 100vh;
	overflow: auto;
}

body {
	min-height: 100vh;
}

a {
	text-decoration: none;
	color: inherit;
}

input[type='text'],
input[type='password'],
input[type='email'],
input[type='url'],
select {
	border: 0;
	outline: 0;
	border-radius: 8px;
	padding: 0 1rem;
	font-family: 'Roboto', sans-serif;
	font-size: 1.4rem;
	font-weight: bold;
	height: 1.7em;
}

input[type='checkbox'] {
	display: none;
}

input[type='checkbox'] + label {
	position: relative;
	cursor: pointer;
	user-select: none;
	padding-left: 1.2rem;
}

input[type='checkbox'] + label::before {
	content: '';
	display: block;
	width: 0.8rem;
	height: 0.8rem;
	left: 0;
	top: 0.3rem;
	border: 1px solid #ffffff;
	position: absolute;
	opacity: 0.8;
	transition: all 0.07s;
}

input[type='checkbox']:checked + label::before {
	width: 8px;
	top: -0.2rem;
	left: 0.2rem;
	border-top-color: transparent;
	border-left-color: transparent;
	transform: translateY(5px) rotate(45deg);
}

button {
	border: 0;
	color: inherit;
	cursor: pointer;
}

button[id='submit'],
.button-style {
	width: 6rem;
	height: 2.5rem;
	border-radius: 8px;
	font-size: 1.5rem;
	font-family: 'Fredoka One', cursive;
	font-weight: 300;
	background: rgba(29, 29, 29, 0.753);
}

table {
	width: 100%;
	max-width: 800px;
	margin: 0 auto;
	font-size: 1.5rem;
	border-collapse: collapse;

	a {
		color: #90cbff;
	}
}

tbody td {
	font-family: 'Roboto';
}

tr {
	height: 3rem;
}

tbody tr {
	border-top: rgba(255, 255, 255, 0.7) 1px solid;
}

hr {
	margin: 5rem auto;
	height: 3px;
	width: 20rem;
	background: white;
	border: none;
	border-radius: 9999px;
	opacity: 0.5;
}

*,
*:before,
*:after {
	box-sizing: border-box;
	margin: 0;
}

.header {
	width: 100%;
	height: 4rem;
	line-height: 4rem;
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(
		180deg,
		rgba(0, 0, 0, 0.8),
		rgba(0, 0, 0, 0.3) 70%,
		rgba(0, 0, 0, 0) 100%
	);
	color: rgba(255, 255, 255, 0.8);
	z-index: 1;

	.title {
		margin-top: 0;
		font-family: 'Fredoka One', cursive;
		font-weight: 300;
		font-size: 2rem;
		display: block;
		letter-spacing: 1px;
		margin-left: 1rem;
		white-space: nowrap;
	}

	.spacer {
		flex: 1 1 0;
	}

	.menu {
		display: flex;
		font-family: 'Roboto', sans-serif;
		font-size: 1.2rem;
		margin-right: 1rem;
		text-transform: capitalize;
		font-weight: bold;
	}

	.menu-item {
		margin: 0 0.5rem;
	}

	.dropdown {
		position: relative;
	}

	.dropdown-trigger {
		display: flex;
		align-items: center;
		height: 100%;
		cursor: pointer;

		&::after {
			content: '';
			display: inline-block;
			width: 0;
			height: 0;
			margin-left: 0.5rem;
			border-top: white 6px solid;
			border-left: transparent 6px solid;
			border-right: transparent 6px solid;
			vertical-align: middle;
		}
	}

	.teamname {
		text-transform: none;
		max-width: 10rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: right;
	}

	.team-score {
		font-family: 'Fredoka One', cursive;
		font-weight: 300;
	}

	.dropdown-menu {
		z-index: 1;
		position: absolute;
		top: calc(100% - 0.5rem);
		right: 0;
		background: #151817;
		line-height: 3rem;
		display: flex;
		flex-direction: column;
		text-transform: capitalize;
		box-shadow: 0 0 5px black;
	}

	.dropdown-menu-item {
		height: 3rem;
		padding: 0 1rem;

		&:hover {
			background: rgba(255, 255, 255, 0.2);
		}
	}
}

.root-content {
	padding: 3rem 1rem 0;
	min-height: calc(100vh - 13rem);
}

section > h2.title {
	font-size: 4rem;
	font-family: 'Fredoka One', cursive;
	font-weight: 300;
	text-align: center;
	text-transform: capitalize;
	letter-spacing: 1px;
	margin-top: 0;
	margin-bottom: 1rem;
	word-break: break-word;

	span {
		color: rgb(242 250 254);
		-webkit-text-fill-color: transparent;
		background: linear-gradient(
			90deg,
			rgb(242 250 254) 0%,
			rgb(118 125 131) 100%
		);
		background-clip: text;
		font-weight: 500;
	}
}

.footer {
	text-align: center;
	margin-top: 5rem;
	padding-bottom: 1rem;
	color: rgba(255, 255, 255, 0.8);
	line-height: 1.2rem;

	&::before {
		content: '';
		display: inline-block;
		width: 8rem;
		height: 1px;
		background: white;
		margin-bottom: 1.2rem;
	}

	a {
		color: #90cbff;
	}

	.sponsor-line {
		line-height: 3rem;

		&::before {
			content: '';
			display: inline-block;
			width: 1rem;
			height: 1rem;
		}
	}

	.flatt {
		vertical-align: middle;
		width: 18rem;
	}

	.google-cloud {
		vertical-align: middle;
		width: 2rem;
	}

	.ojigineko {
		background: url('../static/ojigineko-white.gif');
		background-size: cover;
		display: inline-block;
		width: 1rem;
		height: 1rem;
		opacity: 0;
		vertical-align: -28%;
		transition: opacity 0.2s;
	}

	.sponsor-line:hover .ojigineko {
		opacity: 0.3;
	}
}

.table-wrap {
	overflow-x: auto;
}
</style>
