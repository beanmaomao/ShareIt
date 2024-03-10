<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="show">
        <!-- 搜索区 -->
        <div class="firstSearch">
            <input type="search" placeholder="通过作者名查找日记" v-model="findAuthorContent">
            <el-button type="warning" plain class="all" @click="getAll">All</el-button>
            <el-button type="warning" plain class="gosearch" @click="getAuthor">FIND</el-button>
        </div>
         
        <div class="secondSearch">
            <input type="search" placeholder="通过日记id查找日记" v-model="findIdContent">
            <el-button class="all" type="warning" plain @click="getAll">All</el-button>
            <el-button class="gosearch" type="warning" plain @click="getId">FIND</el-button>
        </div>
        <div class="over">
            <input type="search" placeholder="通过id删除日记" v-model="searchIdContent">
            <el-button type="warning" plain class="gosearch" @click="throughId">DELETE</el-button>
        </div>
        <!-- 展览日记区 -->
        <div class="board">
                <el-descriptions
                    class="margin-top"
                    title="Search-List"
                    :column="5"
                    border>
                    <div class="listItems"  v-for="(value,index) in backContent" :key="index">
                        <button @click="seenone">delete this</button>
                        <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon :style="iconStyle">
                        </el-icon>
                        Author
                        </div>
                    </template>
                    {{ value.Author }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon :style="iconStyle">
                        </el-icon>
                        Title
                        </div>
                    </template>
                    {{ value.Title }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon :style="iconStyle">
                        </el-icon>
                        ID
                        </div>
                    </template>
                    {{ value.ID }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon :style="iconStyle">
                        </el-icon>
                        CreateAt
                        </div>
                    </template>
                    <el-tag size="small">{{ value.CreateAt }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon :style="iconStyle">
                        </el-icon>
                        Content
                        </div>
                    </template>
                    {{ value.Content }}
                    </el-descriptions-item>
                    </div>
                </el-descriptions>
        </div>
        <!-- 新建日记区 -->
       <div class="build">
       <button><RouterLink to="/write">+</RouterLink></button>
       </div>
    </div>
    </template>
    
<script setup lang="ts" name="Show">
import axios from 'axios';
import {ref,reactive,computed} from 'vue'
import { RouterLink } from 'vue-router';

let findAuthorContent=ref('')
let findIdContent=ref('')
let searchIdContent=ref('')
let backContent=reactive([
        {Author:'string',Title:'string',ID:0,CreateAt:'string',Content:'string'},
    ])
function seenone(){
    
}
async function getAll(){
    //向服务器请求数据
    const result=await axios({
        url:'/api/selectDiary',
    })
    findAuthorContent.value=findIdContent.value=''
    let response=result.data.code
    //获取结果生成列表
    if(response=200){
     let content=result.data.data
     for(let i=0;i<content.length;i++)
     {
     backContent.push(content[i])
     }
     console.log(backContent);
     console.log(result.data.data);
    }
    
}
async function getAuthor(){
    //向服务器请求数据
    const result=await axios({
        url:'/api/selectDiaryByAuthor',
        params:{
            author:findAuthorContent.value
        }
    })
    findAuthorContent.value=''
    let response=result.data.code
    //获取结果生成列表
    if(response=200){
        backContent.push(result.data.data)
    }
}

async function getId(){
    //向服务器请求数据
    const result=await axios({
        url:'/api/selectDiaryById',
        params:{
            id:findIdContent.value
        }
    })
    findIdContent.value=''
    let response=result.data.code
    //获取结果生成列表
    if(response=200){
    backContent.push(result.data.data)
    console.log(backContent);
    }
    if(response=400){
        alert('这个ID的日记飞走了~')
    }
}
async function throughId(){
    //向服务器删除数据
    const result=await axios({
        url:'/api/deleteDiary',
        method:'DELETE',
        params:{
            id:searchIdContent.value
        }
    })
    searchIdContent.value=''
    let response=result.data.code
    //获取结果生成列表
    if(response=200){
        alert('成功删除日记！！！')
    }
    if(response=400){
        alert('这个ID的日记飞走了')
    }
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
            .board{
                width: 1000px;
                background: azure;
                position: absolute;
                top: 40vh;
            }
            .show{
                width: 100vw;
                height: 100vh;
                background-color:rgb(236, 234, 231);
                display: flex;
                justify-content: space-around;
                align-items: center;
                position: relative;
            }
            .gosearch{
                width: 140px;
                height: 50px;
                font-size: 30px;
                cursor: pointer;
                display: inline;
            }
            .all{
                display: inline;
                width: 80px;
                height: 50px;
                font-size: 30px;
                cursor: pointer;
            }
            .firstSearch{
                position: absolute;
                top: 10vh;
                left: 32.4vw;
                display: flex;
                width: 500px;
                height: 50px;
                margin-bottom: 20px;
            }
            .firstSearch input{
                width: 520px;
                height: 50px;
                border: 5px solid saddlebrown;
            }
            .secondSearch{
                position: absolute;
                top: 20vh;
                left: 32.4vw;
                display: flex;
                width: 500px;
                height: 50px;
                margin-bottom: 20px;
            }
            .secondSearch input{
                width: 520px;
                height: 50px;
                border: 5px solid saddlebrown;
            }
            .over{
                position: absolute;
                top: 30vh;
                left: 32.4vw;
                display: flex;
                width: 500px;
                height: 50px;
                margin-bottom: 20px;
            }
            .over input{
                width: 520px;
                height: 50px;
                border: 5px solid saddlebrown;
            }
            .list{
                position: absolute;
                width: 600px;
                height: 45px;
                top:16vh;
                left:32.4vw ;
            }
            .list p{
                width: 600px;
                height: 45px;
                background-color: palegoldenrod;
                font-size: 20px;
                margin: 10px 0;
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }
            .delete{
                font-size: 15px;
                font-weight:bolder;
                border: 5px solid goldenrod;
                cursor: pointer;
            }
            .build{
                width: 50px;
                height: 50px;
                font-size: 30px;
                position: absolute;
                right: 10vw;
                bottom: 10vh;
                border: 10px solid saddlebrown;
                border-radius: 10px;
            }
            .build button{
                width: 50px;
                height: 50px;
                font-size: 40px;
                font-weight: bolder;
                font-style: oblique;
                cursor: pointer;
            }
            .build a{
                text-decoration: none;
                color: black;
            }
            //ElementUI属性
            .el-descriptions {
                margin-top: 20px;
            }
            .cell-item {
                display: flex;
                align-items: center;
            }
            .margin-top {
                margin-top: 20px;
            }
    </style>