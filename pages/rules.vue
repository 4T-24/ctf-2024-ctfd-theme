<template>
	<section class="Rules">
		<h2 class="title"><span>4T$ Rules</span></h2>

		<!-- <div
			class="description"
			v-html="$md.render(rules)"
		/> -->
		<div>
			<p>Welcome to the rules page for our event !</p>

			<p>
				To ensure a fair and enjoyable experience for everyone, please take a
				moment to read through the competition guidelines.
			</p>

			<h1>Team</h1>
			<ul>
				<p>Each team is limited to a maximum of 4 members.</p>
				<p>All members must register an account to be eligible for prizes.</p>
				<p>
					Each participant can only be part of one team throughout the event.
				</p>
				<p>
					Collaboration with other teams or third parties is strictly
					prohibited.
				</p>
				<p>
					Teams must choose appropriate names. Offensive or inappropriate names
					are not allowed, they will be renamed or deleted.
				</p>
				<p>
					Teams will accumulate points as a group, individual performance will
					not affect the team's overall score.
				</p>
			</ul>

			<h1>Infrastructure</h1>
			<ul>
				<p>
					Participants are prohibited from attacking the CTF platform, website,
					or any competition-related infrastructure (e.g., scoreboard, servers).
					Any attempt to disrupt or modify the infrastructure will result in
					disqualification.
				</p>
			</ul>

			<h1>Flag</h1>
			<ul>
				<p style="display: block">
					Flags will follow the following format : <code>4T${}</code> (e.g., <code>4T${example}</code>).
					Only flags in the correct format will be accepted.
				</p>
				<p>
					Sharing flags with other teams or outside individuals is strictly
					prohibited.
				</p>
				<p>
					Do not attempt to brute force flag submissions. Excessive incorrect
					submissions may lead to penalties or disqualification.
				</p>
				<p>
					Dynamic Scoring: The points for a challenge decrease over time as more
					teams solve it.
				</p>
			</ul>

			<h1>Scoring</h1>
			<ul>
				<p>
					The scoreboard will update in real-time, reflecting each team's
					current score based on their flag submissions.
				</p>
				<p>
					Once the competition ends, the final scoreboard will determine team
					rankings.
				</p>
				<p>
					In case of a tie, the team with earliest flag submissions will be
					ranked higher.
				</p>
			</ul>

			<h1>Communication</h1>
			<ul>
				<p style="display: block">
					Use the designated official communication platforms (<a href="https://discord.gg/2AbXu9sD2G" target="_blank" rel="noopener noreferrer">Discord</a>) for any
					announcements, queries, or issue reporting. Avoid using unofficial
					channels for event-related discussions.
				</p>
			</ul>

			<h1>Acknowledgment</h1>
			<p>
				By participating in this Capture the Flag (CTF) competition, all
				participants and teams agree to abide by the rules and guidelines
				outlined on this page. Failure to follow these rules may result in
				penalties, including disqualification from the event.
			</p>
		</div>

		<!-- eslint-enable vue/no-v-html -->
	</section>
</template>

<script>
import { mapState } from 'vuex'

export default {
	async asyncData(context) {
		// await context.store.dispatch('updateRules', context);
	},
	head() {
		return {
			title: 'Rules - 4T$ CTF',
		}
	},
	computed: {
		...mapState(['rules']),
	},
}
</script>

<style lang="postcss">
.Rules {
	h1,
	h2,
	h3 {
		font-family: 'Fredoka One', cursive;
		font-weight: 300;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 1px;
		margin-top: 3rem;
		margin-bottom: 1rem;
		word-break: break-word;
	}

	h1 {
		font-size: 2rem;
	}

	h2 {
		font-size: 1.5rem;
	}

	h3 {
		font-size: 1rem;
	}

	strong {
		color: #ffeb3b;
	}

	p,
	ul,
	ol {
		font-family: 'Roboto';
		width: 100%;
		max-width: 50rem;
		margin: 0 auto;
		font-size: 1.4rem;
		line-height: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-weight: 600;
		text-align: center;
	}
}
</style>
