<template>
    <div ref="myDiv" class="radar-echart" />
</template>

<script>
import * as Echarts from 'echarts'
import radarDate from './radar-date';
export {radarData} from './radar-date'
export default {
    name: 'Radar',

    data() {
        return {
            
        };
    },

    mounted() {
        this.echarts = Echarts.init(this.$refs.myDiv)
        this.echarts.setOption(radarDate)
        this.initData()
    },

    methods: {
        initData(){
            setTimeout(()=>{
                const arr = [{
                value: [10, 1, 100, 5, 100, 0],
                name: '张三'
            },
            {
                value: [50, 50, 50, 50, 50, 10],
                name: '李四'
            }]
            radarDate.series[0].data = arr
            this.echarts.setOption(radarDate)
            },2000)
        }
    },
};
</script>

<style lang="scss" scoped>
.radar-echart {
    width: 600px;
    height: 400px;
}
</style>