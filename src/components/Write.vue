<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container">
        <div class="write">
                <el-descriptions
                    class="margin-top"
                    title="Write-List"
                    :column="5"
                    border>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <user />
                        </el-icon>
                        Author
                        </div>
                    </template>
                    <input type="text" v-model="wauthor">
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <iphone />
                        </el-icon>
                        Title
                        </div>
                    </template>
                    <input type="text" v-model="wtitle">
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <location />
                        </el-icon>
                        ID
                        </div>
                    </template>
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <tickets />
                        </el-icon>
                        createTime
                        </div>
                    </template>
                    <el-tag size="small"></el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <office-building />
                        </el-icon>
                        Content
                        </div>
                    </template>
                    <textarea name="" id="" cols="30" rows="5" v-model="wcontent"></textarea>
                    </el-descriptions-item>
                </el-descriptions>
                <button @click="measure">YES</button>
        </div>
        <div class="update">
                <el-descriptions
                    class="margin-top"
                    title="Update-List"
                    :column="5"
                    border>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <user />
                        </el-icon>
                        Author
                        </div>
                    </template>
                    <input type="text" v-model="uauthor">
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <iphone />
                        </el-icon>
                        Title
                        </div>
                    </template>
                    <input type="text" v-model="utitle">
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <location />
                        </el-icon>
                        ID
                        </div>
                    </template>
                    <input type="number" style="width: 40px;" v-model="uid">
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <tickets />
                        </el-icon>
                        createTime
                        </div>
                    </template>
                    <el-tag size="small">{{  }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <office-building />
                        </el-icon>
                        Content
                        </div>
                    </template>
                    <textarea name="" id="" cols="30" rows="5" v-model="ucontent"></textarea>
                    </el-descriptions-item>
                </el-descriptions>
                <button @click="update">YES</button>
        </div>
    </div>
</template>

<script setup lang="ts" name="Write">
import{ref,computed} from 'vue'
import axios from 'axios'

let wauthor=ref('')
let wcontent=ref('')
let wtitle=ref('')

let uauthor=ref('')
let ucontent=ref('')
let utitle=ref('')
let uid=ref(0)
async function measure(){
       //将数据提交到服务器
       const result=await axios({
        url:'/api/createDiary',
        method:'POST',
        data:{
            author:wauthor.value,
            content:wcontent.value,
            title:wtitle.value
        }
    })
    let response=result.data.code
    //获取结果生成列表
    if(result.data.msg='success'){
        console.log(result.data);
        alert('成功新建日记！！！')
        wcontent.value=''
        wtitle.value=''
        wauthor.value=''
    }
    if(response=400){
        alert('这个日记可不过关纳')
    }

}
async function update(){
           //将数据提交到服务器
           const result=await axios({
        url:'/api/updateDiary',
        method:'PUT',
        data:{
            author:uauthor.value,
            content:ucontent.value,
            id:uid.value,
            title:utitle.value
        }
    })
    let response=result.data.code
    //获取结果生成列表
    if(result.data.msg='success'){
        console.log(result.data.data);
        alert('成功更新日记！！！')
    }
    if(result.data.msg='record not found'){
        console.log(result.data.data);
        alert('这个ID的日记飞走了~')
    }
    
    ucontent.value=''
    utitle.value=''
    uauthor.value=''
    uid.value=0
    console.log(result.data);
    
}
//ELementUI的计算属性
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
})

const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  }
})
</script>

<style lang="scss" scoped>
        .container{
            width: 100vw;
            height: 80vh;
            background-color:ivory;
            position: relative;
        }
        .write{
            position:absolute;
            top: 10vh;
            left: 20vw;
        }
        .update{
            position:absolute;
            top: 40vh;
            left: 20vw;
        }
</style> 