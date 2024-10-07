import axios from 'axios'
import { createProxyMiddleware } from 'http-proxy-middleware'

const proxy = createProxyMiddleware({
	target: 'http://localhost:8000',
})

const isStatic = process.env.NUXT_ENV_STATIC === 'true'

const staticBase =
	process.env.NODE_ENV === 'development' || isStatic
		? ''
		: '/themes/4t$ctf/static'

export default {
	proxy: proxy,
	ssr: isStatic,

	target: 'static',

	head: {
		title: '4T$ CTF',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				name: 'description',
				hid: 'description',
				content:
					'4T$ CTF is an on-line CTF organized by 4T$, the official computer society of The University of Tokyo',
			},
			{ name: 'apple-mobile-web-app-title', content: '4T$ CTF 2023' },
			{ name: 'og:title', content: '4T$ CTF 2023' },
			{ name: 'og:site_name', content: '4T$ CTF 2023' },
			{
				name: 'og:description',
				content:
					'4T$ CTF is an on-line CTF organized by 4T$, the official computer society of The University of Tokyo',
			},
		],
		link: [{ rel: 'icon', type: 'image/png', href: `${staticBase}/logo.png` }],
	},

	loading: { color: '#fff' },

	css: [],

	plugins: [
		'~/plugins/axios',
		'~/plugins/vue-timeago',
		'~/plugins/inject-is-static',
	],

	modules: [
		...(isStatic ? [] : ['nuxt-client-init-module']),
		'@nuxtjs/axios',
		'@nuxtjs/markdownit',
		'@nuxtjs/pwa',
		...(isStatic ? [] : ['@nuxtjs/onesignal']),
	],

	generate: {
		fallback: '404.html',
		routes: async () => {
			if (!isStatic) {
				return []
			}
			const teams = []
			let page = 1
			while (true) {
				const { data } = await axios.get(
					'https://score.ctf.tsg.ne.jp/api/v1/teams',
					{ params: { page } },
				)
				teams.push(...data.data)
				if (data.meta.pagination.next === null) {
					break
				}
				page++
			}
			return teams.map(({ id }) => `/teams/${id}`)
		},
		concurrency: 5,
	},

	axios: {
		baseURL: 'https://score.ctf.tsg.ne.jp/',
		browserBaseURL: '/',
	},

	oneSignal: {
		init: {
			appId: '6acee8f3-7842-4a55-91f6-b63ac21a667d', // public token
			allowLocalhostAsSecureOrigin: true,
		},
	},

	markdownit: {
		injected: true,
	},

	build: {
		postcss: {
			plugins: {
				precss: {},
				'postcss-import-url': {},
			},
			preset: {
				features: {
					customProperties: false,
				},
			},
		},
		publicPath: `${staticBase}/_nuxt/`,
	},

	router: {},

	serverMiddleware: [
		...(process.env.NODE_ENV === 'development'
			? [
					{
						path: '/oauth',
						handler: proxy,
					},
					{
						path: '/api',
						handler: proxy,
					},
					{
						path: '/login',
						handler: proxy,
					},
					{
						path: '/logout',
						handler: proxy,
					},
					{
						path: '/admin',
						handler: proxy,
					},
					{
						path: '/register',
						handler: proxy,
					},
					{
						path: '/teams/join',
						handler: proxy,
					},
					{
						path: '/teams/new',
						handler: proxy,
					},
				]
			: []),
	],

	env: {
		session: process.env.SESSION || '',
	},

	pwa: {
		icon: {
			source: 'static/logo.png',
		},
		manifest: {
			name: 'TSG CTF 2023',
			short_name: 'TSG CTF',
			start_url: 'https://score.ctf.tsg.ne.jp/?standalone=true',
			theme_color: '#47e543',
			lang: 'en',
		},
	},
}
