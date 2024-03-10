<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="Read">
        <div class="read">
        <i>日记名字</i><input type="text" v-model="title" name="name"><br>
        <i>日记作者</i><input type="text" v-model="author" name="author"><br>
        <i id="content">日记内容</i><button @click="replace">确认更新</button><br>
        <textarea id="" cols="57" rows="28" v-model="content" name="content"></textarea>
    </div>
    </div>
</template>

<script setup lang="ts" name="See">
import{ref} from 'vue'
import axios from 'axios'
import { RouterLink } from 'vue-router';

const author=ref('')
const title=ref('')
const content=ref('')

async function replace(){
    //将数据提交到服务器
    const result=await axios({
        url:'/api/updateDiary',
        method:'Put',
    }).catch(err=>{
        console.log('all good');
    })
    console.log(result);
}

</script>

<style lang="scss" scoped>
        .Read{
            width: 100vw;
            height: 100vh;
            background-color: tomato;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .read{
            width: 600px;
            height: 800px;
            border: 15px solid snow;
            background-color: lightcoral;   
            position: relative;
        }
        i{
            font-weight: bolder;
        }
        input{
            margin-left: 30px;
        }
        button{
            margin-left: 250px;
        }
        .read a{
            display: block;
            color: antiquewhite;
            text-decoration: none;
        }
        .read textarea{
            width: 49.9vw;
            height: 68.7vh;
            font-size: 20px;
        }
        .replace{
            position: absolute;
            width: 80px;
            height: 30px;
            bottom: 5px;
            right: 5px;
            cursor: pointer;
            font-weight: bolder;
            font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: 20px;
            background-color: firebrick;
            color: azure;
        }
        .delete{
            position: absolute;
            width: 80px;
            height: 30px;
            bottom: 5px;
            right: 100px;
            cursor: pointer;
            font-weight: bolder;
            font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: 20px;
            background-color: firebrick;
            color: azure;
        }
</style>