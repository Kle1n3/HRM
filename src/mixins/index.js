import store from "@/store";
export default {
    methods: {
        checkPermission(str) {
            if (store.getters.points) {
                return store.getters.points.includes(str)
            }
            return false
        }
    }
}