<template>
	<section class="About">
		<h2 class="title"><span>About</span></h2>
		<h3>Period</h3>
		<p class="period">
			<a href="https://www.timeanddate.com/worldclock/fixedtime.html?msg=4T%24+CTF&iso=20241108T18&p1=%3A" target="_blank" rel="noopener noreferrer"> 08/11 18:00 </a>
			-
			<a href="https://www.timeanddate.com/worldclock/fixedtime.html?msg=End+of+4T%24+CTF&iso=20241110T18&p1=%3A" target="_blank" rel="noopener noreferrer"> 10/11 18:00 </a>
		</p>
		<p :style="{textAlign: 'center'}">(UTC)</p>
		<h3>Socials</h3>
		<ul class="socials">
			<li>
				<iframe
					src="https://discord.com/widget?id=1261029732582162442&theme=dark" 
					allowtransparency="true"
					frameborder="0"
					width="100%"
					height="100%"
				>
					<a href="https://discord.gg/2AbXu9sD2G" target="_blank" rel="noopener noreferrer">Discord</a>
				</iframe>
			</li>
		</ul>
		<h3>Sponsor</h3>
		<a href="https://www.infomaniak.com/" target="_blank" rel="noopener noreferrer">
			<img
				src="@/static/logo_infomaniak_baseline_light-theme_vertical.png"
				alt=""
				width="250px"
			/>
		</a>
		<p>Infomaniak is a Swiss-based company specializing in web hosting, cloud services, and domain registration.</p>
		<p>Known for its focus on privacy, security, and sustainability, it offers solutions for websites, email, and drive.</p>
		<p>Do not hesitate to take a look to their offers ! <a href="https://www.infomaniak.com/">https://www.infomaniak.com/</a> </p>
		<h3>Prizes</h3>
		<ul>
			<li>1st: 1'000.- CHF Infomaniak public cloud credits, 1 Infomaniak bag and 1 pen per person.</li>
			<li>2nd: 1'000.- CHF Infomaniak public cloud credits and 1 pen per person.</li>
			<li>3rd: 500.- CHF Infomaniak public cloud credits per person.</li>
			<li>Others: 300.- CHF Infomaniak public cloud credits per person with Infomaniak offer.</li>
		</ul>

		<h3>Staffs</h3>
		<a href="https://4ts.fr" target="_blank" rel="noopener noreferrer">
			<img
				src="@/static/logo.png"
				alt=""
				width="250px"
			/>		
		</a>
		<p>
			4T$ CTF is organized by 4T$, a group of CTF enjoyers.
		</p>
		<p>Below is the full list of 4T$ members who contributed to this 4T$ CTF in success. So many thanks!!</p>
		<ul class="members">
			<li v-for="member in members" :key="member" class="member">
				<a :href="member.url" target="_blank" rel="noopener noreferrer">{{ member.name }}</a>
				<a href="https://en.wiktionary.org/wiki/%E3%81%8A%E8%BE%9E%E5%84%80" target="_blank" rel="noopener noreferrer">
					<img class="ojigineko" src="@/static/ojigineko-white.gif" alt="ojigineko">
				</a>
			</li>
		</ul>
	</section>
</template>

<script>
import {Timeline} from 'vue-tweet-embed';

export default {
	components: {Timeline},
	head() {
		return {
			title: 'About - 4T$ CTF',
		};
	},
	data() {
		return {
			members: [
				{ url: 'https://yewolf.fr', name: 'Yewolf' },
				{ url: 'https://github.com/Nounoursdestavernes', name: 'Nounours des tavernes' },
				{ url: 'https://github.com/NathanCornelie', name: 'Nathan' },
				{ url: 'https://github.com/thibault-cne', name: 'Thib' }, 
				{ url: 'https://github.com/ElFamos0', name: 'Mada07' },
			],
		};
	},
};
</script>

<style lang="postcss">
.About {
	h3 {
		font-size: 2rem;
		font-family: 'Fredoka One', cursive;
		font-weight: 300;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 1px;
		margin-top: 3rem;
		margin-bottom: 1rem;
		word-break: break-word;
	}

	.period {
		text-align: center;
		font-size: 3rem;
		line-height: 3rem;
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
	}

	ul.socials {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		padding: 0;

		li {
			flex: 0 0 20rem;
			height: 30rem;
			overflow-y: auto;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 1rem;
			margin: 0 1rem 0.6rem;
		}
	}

	a {
		color: #90cbff;
	}

	:has(.twitter-timeline) {
		width: 100%;
	}

	.ojigineko {
		background: url('../static/ojigineko-white.gif');
		background-size: cover;
		display: inline-block;
		width: 1rem;
		opacity: 0;
		transition: opacity 0.2s;
		margin-bottom: 0;
		margin-left: 0.2rem;
	}

	img {
		display: block;
		margin: 0 auto;
		max-width: 30rem;
		margin-bottom: 1rem;
	}


	.member {
		&:hover {
			.ojigineko {
				opacity: 0.3;
			}
		}
	}
}
</style>
