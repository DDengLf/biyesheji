<template>
    <div>
        <iframe ref="iframeRef" style="width: 100%; height: 90vh" src="http://127.0.0.1:3000/search.html"
            frameborder="0"></iframe>
        <div style="display: flex; justify-content: space-evenly; align-items: center; margin-top: 10px;" :style="{'background-color': isStartNav ? 'red' : 'transparent',height: isStartNav ? '40px' : '50px'}">
            <template v-if="!isStartNav">
                <van-button type="primary" @click="back">返回</van-button>
                <van-button type="success" @click="startNav">开始导航</van-button>
            </template>
            <template v-else>
                <span style="cursor: pointer;color: #fff;" @click="closeNav">点击退出导航<van-icon name="cross" /></span>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { showNotify, closeNotify } from 'vant';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const iframeRef = ref(null)
const isStartNav = ref(false)
import { showDialog } from 'vant';
onMounted(() => {
    setTimeout(() => {
        iframeRef.value.contentWindow.postMessage({ code: 0, target: route.query.target }, '*')
    }, 2000)
})
const back = () => {
    router.back()
}
const startNav = () => {
    showDialog({
        message: '开始导航,请注意交通安全。',
        theme: 'round-button',
    }).then(() => {
        isStartNav.value = true
        showNotify({ message: '正在导航...', duration: 0, type: 'primary' , position:'bottom'})
    });
 
}
const closeNav = () => {
    closeNotify()
    isStartNav.value = false
}
</script>