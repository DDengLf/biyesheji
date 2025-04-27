<template>
    <div>
        <div id="container"></div>
        <div style="display: flex; justify-content: space-evenly; align-items: center; padding-top: 20px;">
            <van-button type="primary" @click="getLocation">
                <van-icon name="location" />
                <span>定位</span>
            </van-button>
            <van-button type="success" @click="show = true">
                <van-icon name="search" />
                <span>搜索</span>
            </van-button>
        </div>
        <van-popup v-model:show="show" position="bottom" :style="{ padding: '12px' }">
            <van-search v-model="keyword" placeholder="请输入地点" @search="onSearch" />
        </van-popup>

        <van-popup v-model:show="showResult" position="bottom" :style="{ padding: '12px' }">
            <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-cell v-for="item in list" :key="item.id" :title="item.name" @click="onSelect(item)" />
            </van-list>

        </van-popup>
    </div>
</template>


<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { showFailToast } from 'vant';
import AMapLoader from "@amap/amap-jsapi-loader";
import { useRouter } from 'vue-router'
const router = useRouter()
const list = ref([])
const loading = ref(false)
const finished = ref(true)
const showResult = ref(false)
const walking = ref(null)
let map = null;
const position = [106.42388916141795, 29.820693233340318]
const show = ref(false)
const keyword = ref('')
const mapSearch = ref(null)
onMounted(() => {
    window._AMapSecurityConfig = {
        securityJsCode: "cce8ba28fbadfb14c7cf8a8d18e67ede",
    };
    AMapLoader.load({
        key: "2a874019a08053309506eebba95c322d", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Scale", "AMap.ToolBar", 'AMap.PlaceSearch','AMap.Walking'], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
    })
        .then((AMap) => {
            map = new AMap.Map("container", {
                // 设置地图容器id
                viewMode: "2D", // 是否为3D地图模式
                zoom: 17, // 初始化地图级别
                center: position, // 初始化地图中心点位置
            });
            new AMap.Marker({
                position: position,
                map: map,
            });
            console.log(AMap)

            var toolbar = new AMap.ToolBar(); //创建工具条插件实例
            map.addControl(toolbar);

            const placeSearch = new AMap.PlaceSearch({
                pageSize: 5, //单页显示结果条数
                pageIndex: 1, //页码
                city: "023", //兴趣点城市
                citylimit: true, //是否强制限制在设置的城市内搜索
            });
            mapSearch.value = placeSearch
            
        })
        .catch((e) => {
            console.log(e);
        });
});

onUnmounted(() => {
    map?.destroy();
});
const getLocation = () => {
    map.panTo(position)
}

const onSearch = () => {
    show.value = false
    mapSearch.value.searchNearBy(keyword.value, position, 500, function (status, result) {
        if (status === 'no_data') {
            showFailToast('未找到相关地点');
            return
        }
        if (status === 'complete') {
            console.log(result.poiList)
            list.value = result?.poiList?.pois || []
            console.log(list.value)
            showResult.value = true
        }

    });
}
const onSelect = (item) => {
    const target = [item.location.lng, item.location.lat]
    router.push({
        path: '/search',
        query: {
            target: target
        }
    })
    // walking.value.search(position, target, function (status, result) {
    //     if (status === 'complete') {
    //         console.log('绘制步行路线完成')
    //     } else {
    //         console.log('步行路线数据查询失败' + result)
    //     }
    //     showResult.value = false
    // })
}
</script>


<style scoped>
#container {
    width: 100%;
    height: 90vh;
}
</style>
