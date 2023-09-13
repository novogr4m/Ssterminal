<template>
    <div>
        <iframe frameborder="no" marginwidth="0" marginheight="0" :src="videos[activeKey]" scrolling="auto" class="video" />
        <br />
        <a-space>
            <a-button ghost size="small" @click="handleBack">上一条视频</a-button>
            <a-button ghost size="small" @click="handleNext">下一条视频</a-button>
        </a-space>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getHotVideo } from './videoApi'

// 当前选择播放的视频id
let activeKey = ref<number>(0);

// 页数和页容量
let pageNum = ref<number>(1);
const pageSize = 10;

// 存储视频 链接的列表
// "https://player.bilibili.com/player.html?bvid=BV1uU4y1r7hJ"
let videos = ref<any>([]);

/**
 * @description: 上一条视频，对于处理0 - 1的情况，涉及一个巧妙的算法
 * @return {*}
 *
 */
const handleBack = () => {
    if (activeKey.value == 0) {
        // 循环算法，取0 - 1，返回到队尾
        activeKey.value = videos.value.length - 1;
    } else {
        activeKey.value -= 1;
    }
};

/**
 * @description: 下一条视频，每次id + 1，溢出时请求数据
 * @return {*}
 *
 */

const handleNext = () => {
    // 当下标溢出时，请求数据，扩容video数组
    if (activeKey.value + 1 == videos.value.length) {
        pageNum.value++;
        getVideo();
    }
    // 扩容后就可以直接 + 1
    console.log('iamact',activeKey.value);
    activeKey.value++;
};

const getVideo = async () => {
    // 拷贝videos数组
    const mocks = [...videos.value];
    let result:any = await getHotVideo(pageNum.value,pageSize);
    if (result.code == 200) {
        let datas = result.data;
        for (let i = 0; i < pageSize; i++) {
            mocks.push(`https://player.bilibili.com/player.html?bvid=${datas[i].bvid}`);
        }
        videos.value = mocks;
    }
}
onMounted(() => {
    getVideo();
})
</script>

<style  scoped>
.video {
    width: 50%;
    aspect-ratio: 25/12;
}
</style>