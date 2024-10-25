export const state = () => ({
	token: "",
	instance_id: "",
	instancer_base_url: "",
	expire_at: "",
})

export const getters = {
	getAll: (s) => {
		if (localStorage.getItem('token') !== null) {
			let token = localStorage.getItem('token')
			let instance_id = localStorage.getItem('instance_id')
			let instancer_base_url = localStorage.getItem('instancer_base_url')
			let expire_at = localStorage.getItem('expire_at')

			if (new Date().getTime() > parseInt(s.expire_at)) {
				localStorage.removeItem('token')
				localStorage.removeItem('instance_id')
				localStorage.removeItem('instancer_base_url')
				localStorage.removeItem('expire_at')
				return null
			}

			return {
				token: token,
				instance_id: instance_id,
				instancer_base_url: instancer_base_url,
				expire_at: expire_at,
			}
		}
		return null
	},
}

export const mutations = {
	setData(s, data) {
		data = data.data

		if (data.token === undefined || data.instance_id === undefined || data.instancer_base_url === undefined) {
			return
		}

		s.token = data.token
		s.instance_id = data.instance_id
		s.instancer_base_url = data.instancer_base_url
		s.expire_at = new Date().getTime() + 1000 * 60 * 60 * 24 * 2

		localStorage.setItem('token', data.token)
		localStorage.setItem('instance_id', data.instance_id)
		localStorage.setItem('instancer_base_url', data.instancer_base_url)
		localStorage.setItem('expire_at', s.expire_at)
	},
}

export const actions = {
	async getToken({ commit }, { $axios }) {
		if (localStorage.getItem('token') !== undefined && new Date().getTime() < localStorage.getItem('expire_at')) {
			return
		}

		try {
			const { data, headers, request } = await $axios.get(
				`/api/v1/i/token`,
				{ withCredentials: true },
			)
	
			if (headers['content-type'] === 'application/json') {
				commit('setData', { data: data.data })
			} 
		} catch (e) {
			console.log(e)
		}
	},
}
