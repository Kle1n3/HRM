<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="change"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :http-request="upload"
      :class="{hidden:fileList.length === limit}"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog title="Preview" :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <el-progress v-if="showPercent" style="width: 180px" :percentage="percentage" />
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
    SecretId: 'AKID1sTnreAPO6WfX9UYKr76nEOHsCF1asuf', // 身份识别 ID
    SecretKey: 'VjhOM3SbT3MPCiw1pLaYFfogIdhU0FDt', // 身份密钥
});
export default {
  name: "ImageUpload",
    props:{
        limit:{
            type:Number,
            default:1,
        }
    },
  data() {
    return {
        dialogImageUrl: '',
        dialogVisible: false,
        fileList:[],
        currentFileUid:'',
        showPercent:false,
        percentage:0,
    };
  },

  mounted() {},

  methods: {
    handlePictureCardPreview(file){
        this.dialogImageUrl = file.url
        this.dialogVisible=true
    },
    handleRemove(file,fileList){
        this.fileList = this.fileList.filter(item=>item.uid !== file.uid)
    },
    change(file,fileList){
        this.fileList = fileList.map(item => item)
    },
    beforeUpload(file){
        const maxSize = 1024*1024*10
        const temp=['image/jpg','image/jpeg','image/gif','image/png']
        if(file.size>maxSize){
            this.$message.warning('文件大小不能超过10M')
            return false
        }
        if(!temp.includes(file.type)){
            this.$message.warning('文件格式不正确')
            return false
        }
        this.currentFileUid = file.uid
        this.showPercent =true
        this.percentage=0
        return true   
    },
    async upload({file}){
        cos.putObject({
          Bucket: 'sunjinlin-1307766200', // 存储桶
          Region: 'ap-nanjing', // 地域
          Key: file.name, // 文件名
          Body: file, // 要上传的文件对象
          StorageClass: 'STANDARD', // 上传的模式类型 直接默认 标准模式即可
          // 上传到腾讯云 =》 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
          onProgress: (progressData)=>{
        console.log(JSON.stringify(progressData));
        this.percentage = progressData.percent*100
    }
        }, (err, data)=> {
          // data返回数据之后 应该如何处理
          console.log(err || data)
          if(err){
            return this.$message.error('上传失败')
          }
          this.fileList = this.fileList.map(item=>{
            if(item.uid===this.currentFileUid){
                item.url='http://'+data.Location
                item.upload =true
            }
            return item
          })
          this.currentFileUid =''
          this.showPercent=false
        })
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep .hidden{
    div.el-upload{
        display: none;
    }
}
</style>
