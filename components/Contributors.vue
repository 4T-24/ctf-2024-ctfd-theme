<template>
	<div class="contributors_container">
		<p>LA TEAM</p>
		<div class="contributors">
			<div>
				<img
					src="@/static/yewolf.png"
					alt=""
					width="80px"
					class="contributor_image"
				/>

				<p style="font-weight: bold; margin-bottom: 5px">Yewolf</p>
				<p style="text-align: center">Co-founder</p>
			</div>
			<div>
				<img
					src="@/static/myster-goo.png"
					alt=""
					width="80px"
					class="contributor_image"
				/>

				<p style="font-weight: bold; margin-bottom: 5px">MysterGoo</p>
				<p style="text-align: center">Co-founder</p>
			</div>
		</div>
		<div class="contributors">
			<div>
				<img
					src="@/static/dog.jpeg"
					alt=""
					width="80px"
					class="contributor_image"
				/>

				<p style="font-weight: bold; margin-bottom: 5px">Nathan</p>
				<p style="text-align: center">Big BG</p>
			</div>
			<div>
				<img
					src="@/static/mada07.png"
					alt=""
					width="80px"
					class="contributor_image"
				/>

				<p style="font-weight: bold; margin-bottom: 5px">Thib</p>
				<p style="text-align: center">BackUp Infra</p>
			</div>
			<div>
				<img
					src="@/static/thib.png"
					alt=""
					width="80px"
					class="contributor_image"
				/>

				<p style="font-weight: bold; margin-bottom: 5px">BackUp Infra</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style lang="postcss">
.contributors_container {
	display: flex;
	flex-direction: column;
	align-items: center;
	& > p {
		font-weight: bolder;
		font-size: larger;
		margin-bottom: 15px;
	}
	.contributors {
		margin-top: 20px;
		display: flex;
		align-self: center;
		justify-content: center;
		width: 100%;
		& > div {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 20%;
			max-width: 150px;
		}
		.contributor_image {
			margin-bottom: 10px;
			padding-left: 5px;
			padding-right: 5px;
			border-radius: 100%;
			overflow: hidden;
		}
	}
}
</style>
