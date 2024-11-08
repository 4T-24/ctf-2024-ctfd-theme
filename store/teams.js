export const state = () => ({
	teams: new Map(),
});

export const getters = {
	getTeam: (s, id) => s.teams.get(id),
};

export const mutations = {
	setTeam(s, team) {
		s.teams.set(team.id, team);
	},
};

export const actions = {
	async getTeam({commit, dispatch, rootState}, {$axios, id}) {
		const {data: team, headers} = await $axios.get(`/api/v1/teams/${id}`);
		if (headers['content-type'] === 'application/json') {
			let solves = {data: []};
			try {
				let resp = await $axios.get(`/api/v1/teams/${id}/solves`);
				solves = resp.data;
			} catch (e) {
				solves = {data: []};
			}

			const teamData = {
				...team.data,
				solves: solves.data,
			};
			commit('setTeam', teamData);
			commit('setIsInTeam', true, {root: true});
			if (rootState.isStatic) {
				const solvers = Array.from(new Set([...solves.data.map(({user}) => user), ...team.data.members]));
				await dispatch('users/getUsers', {$axios, ids: solvers}, {root: true});
			}
			return teamData;
		}
		commit('setIsLoggedIn', false, {root: true});
		return null;
	},
};
