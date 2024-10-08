<template>
	<div v-if="display && challenge" class="modale">
		<div class="modale-content">
			<div class="close-button">
				<button @click="close">X</button>
			</div>
			<div>
				<h1 class="title">{{ challenge.name }}</h1>
			</div>
			<marquee v-if="isSolvesOpen" class="solves">
				<span v-if="challenge.solveInfos === undefined">Loading...</span>
				<span v-else>
					<span v-for="j in 100" :key="j">
						<span
							v-for="(solve, i) in challenge.solveInfos"
							:key="solve.account_id"
						>
							{{ formatOrdinals(i + 1) }}:
							<iso-link :to="`/teams/${solve.account_id}`">{{
								solve.name
							}}</iso-link>
							<liquid-spot
								v-if="i === 0"
								class="first-blood"
								name="first blood"
							/>
						</span>
						<span :style="{ display: 'inline-block', width: '3rem' }" />
					</span>
				</span>
			</marquee>

			<div v-if="challenge" class="details">
				<div
					class="solve-count"
					:class="{
						'someone-solved': challenge.solves > 0,
						'is-solves-open': isSolvesOpen,
						solved: challenge.solved_by_me,
					}"
					@click="toggleSolves"
				>
					{{ getSolvesText(challenge.solves) }}
				</div>
				<div class="description-header">
					<div class="metainfo">
						<div v-if="badgeUrl !== null" class="server-status">
							<img :src="badgeUrl" />
						</div>
						<div v-if="author" class="author">
							<span class="author-name">Author: {{ author }}</span>
						</div>
					</div>
				</div>

				<div class="description">
					<div
						ref="description"
						:class="{
							blured: challenge.type != 'standard',
							'description-column': true,
						}"
						v-html="$md.render(getDescription())"
					/>

					<div
						v-if="challenge.type != 'standard'"
						:class="{ animation_background: !test, 'instance-btn': true }"
					>
						<button
							v-if="test"
							@click="createInstance()"
							class="instance-btn"
							style="background-color: green"
						>
							<span>Create Instance <Home /></span>
						</button>
						<button v-else @click="test = !test" class="animation_background">
							<!-- <div style="width: 150px; height: 20px"></div> -->
							<span class="instance-loader" style="display: flex">
								<pulse-loader
									color="#fff"
									size="6px"
									style="margin-left: 3px"
								/>

								Creating
							</span>
						</button>
					</div>
				</div>

				<div class="attachments">
					<a
						v-for="file in challenge.files"
						:key="file"
						class="attachment"
						:href="getFileLink(file)"
						target="_blank"
						rel="noopener noreferrer"
					>
						{{ getFileName(file) }}
					</a>
				</div>
				<div v-if="challenge.type != 'standard'" class="">
					<button class="quit_button" @click="stopInstance()">
						<span>Stop Instance<PowerSettings /></span>
					</button>
				</div>
			</div>

			<div v-else class="description-loading">
				<pulse-loader color="white" />
			</div>
			<form class="flag-form" @submit="onSubmitFlag">
				<input
					v-model="flagText"
					type="text"
					name="flag"
					class="flag-input"
					autocomplete="off"
					autocorrect="off"
					autocapitalize="off"
					spellcheck="false"
					:class="{ yay, boo }"
					:readonly="yay"
					:placeholder="getPlaceholderText(challenge)"
					:disabled="yay || challenge.solved_by_me || solved_by_team || isEnded"
				/>
				<button
					type="submit"
					class="flag-submit"
					:disabled="yay || challenge.solved_by_me || solved_by_team || isEnded"
				>
					Send
				</button>
			</form>
		</div>
	</div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { mapState } from 'vuex'
import IsoLink from '~/components/IsoLink.vue'
import LiquidSpot from 'vue-material-design-icons/LiquidSpot.vue'
import Home from 'vue-material-design-icons/Home.vue'
import PowerSettings from 'vue-material-design-icons/Power.vue'
export default {
	// TODO : manage solved counts little component

	components: { PulseLoader, IsoLink, LiquidSpot, Home, PowerSettings },

	props: {
		display: {
			type: Boolean,
			default: false,
		},
		solved_by_team: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['closeModal'],
	data() {
		return {
			showButton: false,
			test: true,
			docState: 'saved',
			isOpen: false,
			flagText: '',
			isSolvesOpen: false,
			badgeUrl: null,
			yay: false,
			boo: false,
		}
	},

	computed: {
		challenge() {
			console.log(this.$store.state.challenges.selectedChallenge)

			return this.$store.state.challenges.selectedChallenge
		},
		...mapState(['isEnded', 'isStatic', 'language']),
		tags() {
			return this.challenge.tags
				.map((tag) => tag.value)
				.filter((tag) => !tag.match(/author:/i))
		},
		author() {
			const authorTag = this.challenge.tags.find((tag) =>
				tag.value.match(/author:/i),
			)
			if (!authorTag) {
				return undefined
			}
			return authorTag.value.split(':')[1].trim()
		},
	},

	methods: {
		toggleButton() {
			this.showButton = !this.showButton // Toggle the button visibility
		},
		onClickTitle() {
			if (this.isOpen) {
				this.isOpen = false
			} else {
				if (!this.isStatic) {
					this.$store.dispatch('challenges/getDetail', {
						$axios: this.$axios,
						id: this.challenge.id,
					})
				}
				this.isOpen = true
			}
		},
		// https://stackoverflow.com/a/13627586/2864502
		formatOrdinals(i) {
			const j = i % 10
			const k = i % 100
			if (j === 1 && k !== 11) {
				return `${i}st`
			}
			if (j === 2 && k !== 12) {
				return `${i}nd`
			}
			if (j === 3 && k !== 13) {
				return `${i}rd`
			}
			return `${i}th`
		},
		getFileName(path) {
			const components = new URL(path, location.href).pathname.split('/')
			return components[components.length - 1]
		},
		getFileLink(path) {
			if (!this.isStatic) {
				return path
			}

			const components = new URL(path, location.href).pathname.split('/')
			const fileName = components[components.length - 1]
			const challengeId = components[components.length - 2]
			return `https://tsgctf-ctfd-storage.storage.googleapis.com/tsgctf-ctfd-storage/${challengeId}/${fileName}`
		},
		getSolvesText(solves) {
			return `${solves} ${solves === 1 ? 'solve' : 'solves'}`
		},
		getPlaceholderText(challenge) {
			if (challenge.solved_by_me) {
				return 'You already solved this challenge!'
			}
			if (!challenge.solved_by_me && this.solved_by_team) {
				return 'Your team solved this challenge!'
			}

			if (this.isEnded) {
				return 'Contest has ben ended'
			}

			return 'Enter your flag here ...'
		},
		close() {
			this.yay = false
			this.isSolvesOpen = false
			this.$emit('closeModal')
		},
		async toggleSolves() {
			if (this.isSolvesOpen) {
				this.isSolvesOpen = false
				return
			}
			if (!this.isStatic) {
				await this.$store.dispatch(
					'challenges/getSelectedChallengeSolvesInfos',
					{ $axios: this.$axios, id: this.challenge.id },
				)
			}
			this.isSolvesOpen = true
		},
		async createInstance() {
			await this.$store.dispatch('challenges/createChallengeInstance', {
				$axios: this.$axios,
				id: this.challenge.id,
			})
		},
		async stopInstance() {
				await this.$store.dispatch('challenges/deleteChallengeInstance', {
				$axios: this.$axios,
				id: this.challenge.id,
			})
		},
		getDescription() {
			const descriptions = this.challenge.description.split(/^---$/m)
			if (descriptions.length >= 2 && this.language === 'ja') {
				return descriptions[1]
			}
			return descriptions[0]
		},
		async onSubmitFlag(event) {
			event.preventDefault()
			this.boo = false
			const form = new FormData(event.target)
			const inputFlag = form.get('flag')
			const { data } = await this.$axios.post(
				'/api/v1/challenges/attempt',
				{
					challenge_id: parseInt(this.challenge.id),
					submission: inputFlag,
				},
				{
					headers: {
						'content-type': 'application/json',
					},
				},
			)
			if (data.data.status === 'correct') {
				this.yay = true
				this.flagText = 'Challenge Solved'
				await this.$store.dispatch('challenges/updateChallenges', {
					$axios: this.$axios,
				})
			} else {
				this.boo = true
			}
		},
		updateImgSrc() {
			if (this.$refs.description) {
				const imgs = Array.from(this.$refs.description.querySelectorAll('img'))
				const timestamp = Date.now()
				for (const img of imgs) {
					const srcUrl = new URL(img.src)
					srcUrl.searchParams.set('ts', timestamp.toString())
					img.src = srcUrl.toString()
				}
			}
		},
		async fetchBadgeUrl() {
			if (this.isEnded) {
				this.badgeUrl = 'https://img.shields.io/badge/Unknown-CTF_Ended-blue'
			} else {
				// const {data} = await this.$axios.get(`/api/v1/challenges/${this.challenge.id}/badge`);
				// this.badgeUrl = data.badge_url;
			}
		},
	},
}
</script>

<style lang="postcss">
.modale {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
}
.modale-content {
	background-color: #424242;
	width: 80%;
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.close-button {
	display: flex;
	justify-content: flex-end;
	button {
		background-color: transparent;
		border: none;
		color: white;
		font-size: 1.5rem;
		cursor: pointer;
	}
}
.details {
	display: flex;
	flex-direction: column;
}
.title {
	font-size: 1.3rem;
	color: white;
	text-align: center;
	margin-bottom: 15px;
}
.solve-count {
	text-align: center;
	padding: 0 0.3rem;

	border-radius: 5px;

	cursor: pointer;
	margin-bottom: 5px;
	&.someone-solved {
		background: #ff5722;
	}

	&.solved {
		background: #4caf50;
	}

	&.is-solves-open {
		bottom: calc(100% + 2rem);
	}
}

.solves {
	display: block;
	height: 2rem;
	line-height: 2rem;
	padding: 0 0.5rem;
	margin-top: 1rem;
	border-radius: 1rem;
	border-top-left-radius: 1rem;
	border-top-right-radius: 1rem;
	color: #fff;
	font-weight: bold;
	text-align: right;
	background: #000000af;
	overflow: hidden;

	.first-blood {
		color: red;
		vertical-align: text-top;
		margin-right: 3px;
	}

	a {
		color: #03a9f4;
	}
}

.description-header {
	display: flex;
	justify-content: space-between;
}

.author {
	display: block;
}

.lang-switcher {
	.lang {
		display: inline-block;
		cursor: pointer;

		&.active {
			border-bottom: 1.5px white solid;
		}
	}

	img,
	.lang-name {
		vertical-align: middle;
	}
}

.description {
	min-height: 150px;
	position: relative;
	font-size: 1.2rem;
	margin-bottom: 1rem;
	font-family: 'General Sans Regular', sans-serif;
	display: flex;

	line-height: 1.6em;
	.blured {
		filter: blur(5px);
	}
	.description-column {
		flex: 1 0 0;
		padding: 0 0.5rem;

		&:nth-child(2) p {
			font-weight: normal;
			letter-spacing: 0;
		}
	}

	strong {
		color: #ffeb3b;
	}

	p {
		margin: 0.5rem 0;
		font-weight: bold;
	}

	a {
		color: #03a9f4;
	}

	code {
		background: #333;
		padding: 0.1rem 0.5rem;
		font-weight: normal;
	}

	pre {
		background: #333;
		padding: 0.5rem;
		white-space: pre-line;
		word-break: break-all;

		code {
			background: transparent;
			padding: 0;
		}
	}

	hr {
		opacity: 0.4;
		margin: 1.5rem 1rem;
	}

	img {
		max-width: 100%;
	}
}
.attachments {
	display: flex;
	flex-wrap: wrap;
}

.attachment {
	min-width: 15rem;
	margin: 0.5rem;
	height: 3rem;
	line-height: 3rem;
	background: #222;
	border-radius: 3px;
	text-align: center;
	padding: 0 1rem;

	&::before {
		content: '';
		background: url('https://cdn.jsdelivr.net/gh/google/material-design-icons@2.2.0/file/2x_web/ic_attachment_white_18dp.png');
		background-size: cover;
		display: inline-block;
		width: 1.4rem;
		height: 1.4rem;
		vertical-align: middle;
	}
}

.description-loading {
	height: 6rem;
	display: flex;
	justify-content: center;
	align-items: center;
}

.flag-form {
	display: flex;
	margin-top: 1rem;
}

.flag-input {
	flex: 1 1 0;
	width: 0;
	height: 2.5rem;
	border-radius: 5px;
	margin-right: 0.5rem;
	padding: 0 1rem;
	font-family: 'Roboto', sans-serif;
	font-size: 1.4rem;
	background: #131313b9;
	color: #c0c0c0;
	border: 1px solid #ffffffdc;
	&[disabled] {
		background: none;
		color: black;
	}

	&.yay {
		background: linear-gradient(
			-45deg,
			#ee7752,
			#e73c7e,
			#23a6d5,
			#23d5ab,
			#ee7752,
			#e73c7e,
			#23a6d5,
			#23d5ab,
			#ee7752,
			#e73c7e,
			#23a6d5,
			#23d5ab,
			#ee7752,
			#e73c7e,
			#23a6d5,
			#23d5ab,
			#ee7752,
			#e73c7e,
			#23a6d5,
			#23d5ab
		);
		background-size: 1000% 1000%;
		animation: Gradient 3s ease-out 1 both;
		color: white;
		font-size: 1.2rem;
		font-family: 'Fredoka One', cursive;

		@keyframes Gradient {
			0% {
				background-position: 0% 50%;
			}
			100% {
				background-position: 100% 50%;
			}
		}
	}

	&.boo {
		animation-name: shake;
		animation-duration: 0.7s, 0.35s;
		animation-iteration-count: 1, 2;
	}

	@keyframes shake {
		0%,
		20%,
		40%,
		60%,
		80% {
			transform: translateX(8px);
		}
		50% {
			color: indianred;
		}
		10%,
		30%,
		50%,
		70%,
		90% {
			transform: translateX(-8px);
		}
	}
}

.flag-submit {
	flex: 0 0 6rem;
	background: #131313b9;
	font-size: 1.2rem;
	border-radius: 5px;
	&[disabled] {
		cursor: default;
		background: #888;
	}
}
@keyframes slidein {
	from {
		left: -40px;
	}
	to {
		left: 0px;
	}
}
@keyframes background_change {
	from {
		background-color: green;
	}
	to {
		background-color: gray;
	}
}
.instance-btn {
	width: 100%;
	min-height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	& > button {
		position: relative;
		min-width: 150px;
		padding: 10px;
		overflow: hidden;
		flex: 0 0 150px;
		background: gray;
		font-size: 1.2rem;
		border-radius: 5px;
		& > span {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-right: 10px;
		}
		&[disabled] {
			cursor: default;
		}
	}
	.animation_background {
		animation: 0.5s linear background_change;
	}
	.instance-loader {
		position: relative;
		& > div {
			display: flex;
			align-items: center;
		}
		animation: 1s slidein;
	}
}
.quit_button {
	background-color: red;
	border-radius: 5px;
	padding: 10px;
	span {
		display: flex;
		align-items: center;
		font-size: 1.2rem;
		border-radius: 5px;
		gap: 4px;
	}
}
.metainfo {
	display: flex;
	flex-direction: column;
	align-items: flex-end;

	.server-status {
		margin-bottom: 0.2rem;
	}
}
</style>
