import { constantRoutes, asyncRoutes } from "@/router";

export default {
    namespaced: true,
    state() {
        return {
            routes: constantRoutes,
        }
    },
    getters: {

    },
    mutations: {
        setRoutes(state, newRoutes) {
            state.routes = [...constantRoutes, ...newRoutes]
        }
    },
    actions: {
        filterRoutes(context, data) {
            const userRoutes = asyncRoutes.filter(item => data.includes(item.name))
            context.commit('setRoutes', userRoutes)
            return userRoutes
        }
    }
}