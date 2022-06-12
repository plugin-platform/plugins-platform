import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
	{
		name: 'index',
		path: '/index',
		meta: {
			size: {
				width: 800,
				height: 80,
			},
		},
		component: () => import('@/views/index/index.vue'),
	},
	{
		name: 'setting',
		meta: {
			size: {
				width: 800,
				height: 620,
			},
		},
		path: '/setting',
		component: () => import('@/views/setting/index.vue'),
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

router.beforeResolve(to => {
	if (to?.meta?.size) {
		window.pp.setWindowSize(to.meta.size)
	}
})

export default router
