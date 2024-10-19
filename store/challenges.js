import Vue from 'vue'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'

const categoryOrders = [
	'cooldown',
	'warmup',
	'pwn',
	'rev',
	'web',
	'crypto',
	'stego',
]

export const state = () => ({
	challenges: [],
	selectedChallenge: null,
	selectedChallengeInstance: {
		status: 'Stopped / Starting / Stopping / Running',
		servers: [
			{
				kind: 'http',
				host: 'cdsfj.com',
			},
			{
				kind: 'tcp',
				host: 'cdsfj.com',
				port: '5656',
			},
		],
	},
})

export const getters = {
	getChallenges: (s) => s.challenges,
	getInstance: (s) => s.selectedChallengeInstance,
	getCategories: (s, g) =>
		Object.entries(groupBy(g.getChallenges, ({ category }) => category))
			.map(([name, challenges]) => ({
				name,
				challenges: challenges.sort((a, b) => a.value - b.value),
			}))
			.sort((a, b) => {
				const orderA = categoryOrders.indexOf(a.name.toLowerCase())
				const orderB = categoryOrders.indexOf(b.name.toLowerCase())
				return (orderA === -1 ? 9999 : orderA) - (orderB === -1 ? 9999 : orderB)
			}),
	getSelectedChallenge: (s) => s.selectedChallenge,
}

export const mutations = {
	setChallenges(s, challenges) {
		const oldChallenges = s.challenges || []
		s.challenges = challenges.map((challenge) => {
			const oldChallenge = oldChallenges.find(({ id }) => id === challenge.id)

			if (!oldChallenge) {
				return challenge
			}

			for (const [key, value] of Object.entries(challenge)) {
				Vue.set(oldChallenge, key, value)
			}
			return oldChallenge
		})
	},
	setChallengeDetail(s, { id, data }) {
		const target = s.challenges.findIndex((challenge) => challenge.id === id)
		Vue.set(s.challenges, target, {
			...s.challenges[target],
			details: data,
		})
	},
	setChallengeSolves(s, { id, data }) {
		const target = s.challenges.findIndex((challenge) => challenge.id === id)
		Vue.set(s.challenges, target, {
			...s.challenges[target],
			solveInfos: data,
		})
	},
	setSelectedChallenge(s, challenge) {
		s.selectedChallenge = challenge.challenge
	},
	setSelectedChallengeSolvesInfos(s, infos) {
		s.selectedChallenge.solveInfos = infos.data
	},
	setSelectedChallengeInstance(s, instance) {
		s.selectedChallengeInstance = instance
	},
}

export const actions = {
	async updateChallenges({ commit, dispatch, rootState }, { $axios }) {
		try {
			const { data, headers, request } = await $axios.get('/api/v1/challenges')
			if (headers['content-type'] === 'application/json') {
				commit('setIsStarted', true, { root: true })
				commit('setChallenges', data.data)

				if (rootState.isStatic) {
					await Promise.all(
						data.data.flatMap(({ id }) => [
							dispatch('getDetail', { $axios, id }),
							dispatch('getSolveInfos', { $axios, id }),
						]),
					)
				}
			} else {
				const url = new URL(request.responseURL)
				if (url.pathname === '/team') {
					commit('setIsInTeam', false, { root: true })
				} else if (url.pathname === '/confirm') {
					commit('setIsVerified', false, { root: true })
				} else {
					commit('setIsLoggedIn', false, { root: true })
				}
				return
			}
		} catch (error) {
			const message = get(error, ['response', 'data', 'message'], '')
			if (message.includes('not started')) {
				commit('setIsStarted', false, { root: true })
			} else if (message.includes('has ended')) {
				commit('setIsEnded', true, { root: true })
			} else {
				commit('setIsInTeam', false, { root: true })
			}
		}
	},
	async getDetail({ commit }, { $axios, id }) {
		const { data, headers, request } = await $axios.get(
			`/api/v1/challenges/${id}`,
		)
		if (headers['content-type'] === 'application/json') {
			commit('setChallengeDetail', { id, data: data.data })
		} else {
			const url = new URL(request.responseURL)
			if (url.pathname === '/team') {
				commit('setIsInTeam', false, { root: true })
			} else if (url.pathname === '/confirm') {
				commit('setIsVerified', false, { root: true })
			} else {
				commit('setIsLoggedIn', false, { root: true })
			}
		}
	},
	async getSelectedChallengeDetail({ commit }, { $axios, id }) {
		const { data, headers, request } = await $axios.get(
			`/api/v1/challenges/${id}`,
		)
		if (headers['content-type'] === 'application/json') {
			commit('setSelectedChallenge', { challenge: data.data })
		} else {
			const url = new URL(request.responseURL)
			if (url.pathname === '/team') {
				commit('setIsInTeam', false, { root: true })
			} else if (url.pathname === '/confirm') {
				commit('setIsVerified', false, { root: true })
			} else {
				commit('setIsLoggedIn', false, { root: true })
			}
		}
	},

	async getSolveInfos({ commit }, { $axios, id }) {
		const { data, headers, request } = await $axios.get(
			`/api/v1/challenges/${id}/solves`,
		)
		if (headers['content-type'] === 'application/json') {
			commit('setChallengeSolves', { id, data: data.data })
		} else {
			const url = new URL(request.responseURL)
			if (url.pathname === '/team') {
				commit('setIsInTeam', false, { root: true })
			} else if (url.pathname === '/confirm') {
				commit('setIsVerified', false, { root: true })
			} else {
				commit('setIsLoggedIn', false, { root: true })
			}
		}
	},
	async getSelectedChallengeSolvesInfos({ commit }, { $axios, id }) {
		const { data, headers, request } = await $axios.get(
			`/api/v1/challenges/${id}/solves`,
		)
		if (headers['content-type'] === 'application/json') {
			commit('setSelectedChallengeSolvesInfos', { data: data.data })
		} else {
			const url = new URL(request.responseURL)
			if (url.pathname === '/team') {
				commit('setIsInTeam', false, { root: true })
			} else if (url.pathname === '/confirm') {
				commit('setIsVerified', false, { root: true })
			} else {
				commit('setIsLoggedIn', false, { root: true })
			}
		}
	},
	async getSelectedChallengeInstanceInfos({ commit }, { $axios, id, i_id }) {
		const { data, headers, request } = await $axios.get(
			`/api/v1/challenges/${id}/instance`,
		)
		if (headers['content-type'] === 'application/json') {
			commit('setSelectedChallengeInstance', { data: data.data })
		} else {
			const url = new URL(request.responseURL)
			if (url.pathname === '/team') {
				commit('setIsInTeam', false, { root: true })
			} else if (url.pathname === '/confirm') {
				commit('setIsVerified', false, { root: true })
			} else {
				commit('setIsLoggedIn', false, { root: true })
			}
		}
	},
	async createChallengeInstance({ commit }, { $axios, id }) {
		const { data, headers, request } = await $axios.post(
			`/api/v1/challenges/${id}/instance`,
			{
				headers: {
					'content-type': 'application/json',
				},
			},
		)

		if (headers['content-type'] === 'application/json') {
			commit('setSelectedChallengeInstance', { data: data.data })
		} else {
			const url = new URL(request.responseURL)
			if (url.pathname === '/team') {
				commit('setIsInTeam', false, { root: true })
			} else if (url.pathname === '/confirm') {
				commit('setIsVerified', false, { root: true })
			} else {
				commit('setIsLoggedIn', false, { root: true })
			}
		}
	},
	async deleteChallengeInstance({ commit }, { $axios, id }) {
		const { data, headers, request } = await $axios.delete(
			`/api/v1/challenges/${id}/instance`,
			{ withCredentials: true },
		)

		if (headers['content-type'] === 'application/json') {
			commit('setSelectedChallengeInstance', { data: data.data })
		} else {
			const url = new URL(request.responseURL)
			if (url.pathname === '/team') {
				commit('setIsInTeam', false, { root: true })
			} else if (url.pathname === '/confirm') {
				commit('setIsVerified', false, { root: true })
			} else {
				commit('setIsLoggedIn', false, { root: true })
			}
		}
	},
}
