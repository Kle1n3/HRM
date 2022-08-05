import PageTools from './PageTools'
import UploadExcel from './uploadExcel'
import ImageUpload from './ImageUpload'
export default {
    install(Vue) {
        //  注册全局的通用栏组件对象
        Vue.component('PageTools', PageTools)
        Vue.component('UploadExcel', UploadExcel)
        Vue.component('ImageUpload', ImageUpload)
    }
}