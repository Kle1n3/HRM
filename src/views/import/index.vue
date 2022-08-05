<template>
  <div>
    <h1 v-if="type === 'user'">员工信息导入</h1>
    <h1 v-if="type === 'money'">工资信息导入</h1>
    <h1 v-if="type === 'socials'">社保信息导入</h1>
    <UploadExcel :on-success="success" />
  </div>
</template>

<script>
import {importEmployees} from '@/api/employees'
export default {
  name: "Import",

  data() {
    return {
        type:this.$route.query.type
    };
  },

  mounted() {},

  methods: {
    async success({ header, results }){
        console.log(header);
        console.log(results);
        const userRelations = {
        入职日期: "timeOfEntry",
        手机号: "mobile",
        姓名: "username",
        转正日期: "correctionTime",
        工号: "workNumber",
      };
      const arr =[]
      results.forEach(item=>{
        const obj ={}
        Object.keys(item).forEach(value=>{
            const temp =['timeOfEntry','correctionTime']
            if(temp.includes(userRelations[value])){
                obj[userRelations[value]] =this.formatDate(item[value],'/')
            }
            else{
                obj[userRelations[value]] = item[value]
            }
            arr.push(obj)
        })
      })
      await importEmployees(arr)
      this.$message.success('导入成功')
      this.$router.back()
    },
    // 处理excel中日期问题
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1);
      time.setYear(time.getFullYear() - 70);
      const year = time.getFullYear() + "";
      const month = time.getMonth() + 1 + "";
      const date = time.getDate() - 1 + "";
      if (format && format.length === 1) {
        return year + format + month + format + date;
      }
      return (
        year +
        (month < 10 ? "0" + month : month) +
        (date < 10 ? "0" + date : date)
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
