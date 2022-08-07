import PageTools from './PageTools'
import UploadExcel from './uploadExcel'
import ImageUpload from './ImageUpload'
import ScreenFull from './ScreenFull'
import ThemePicker from './ThemePicker'
import TagsView from './TagsView'
import lang from './lang'
export default {
    install(Vue) {
        //  注册全局的通用栏组件对象
        Vue.component('PageTools', PageTools)
        Vue.component('UploadExcel', UploadExcel)
        Vue.component('ImageUpload', ImageUpload)
        Vue.component('ScreenFull', ScreenFull)
        Vue.component('ThemePicker', ThemePicker)
        Vue.component('TagsView', TagsView)
        Vue.component('lang', lang)

    }
}