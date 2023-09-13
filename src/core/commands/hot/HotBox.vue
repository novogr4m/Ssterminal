<template>
    <div>
        <div v-for="(song, index) in songList" :key="index" class="box">
            <a-card style="width: 240px;">
                <template #cover>
                    <img :src="song?.al?.picUrl" :alt="song?.al?.name" />
                </template>
                <a :href="`https://music.163.com/#/song?id=${song?.id}`">
                    <a-card-meta :title="song?.al?.name">
                    </a-card-meta>
                </a>
            </a-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { listHotMusics } from "./hotApi";
import { message } from "ant-design-vue";

const songList = ref([] as any[]);

const getMusicList = async () => {
    const res: any = await listHotMusics();
    if (res?.code === 200) {
        const songs = res.data;
        console.log(songs);
        songList.value = songs.slice(0, 10);
    } else {
        message.error('加载失败');
    }
}

onMounted(() => {
    //组件挂载时加载图片
    getMusicList();
})


</script>

<style scoped>
    .box{
       margin: 0 0 20px 20px;
    }
</style>
