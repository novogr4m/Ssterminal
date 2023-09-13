<template>
    <div style="background-color: #6a6a6a;padding: 20px">
        <a-row :gutter="16">
            <a-col :span="6" v-for="(item, index) in weatherList.casts" :key="index">
                <a-card :bordered="false">
                    <template #title><strong>{{ item.date }}</strong></template>
                    <strong class="title">白天天气：</strong><span>{{ item.dayweather }}</span><br>
                    <strong class="title">白天温度：</strong> <span>{{ item.daytemp_float }}°C</span><br>
                    <strong class="title">夜间天气：</strong><span>{{ item.nightweather }}</span><br>
                    <strong class="title">夜间温度：</strong> <span>{{ item.nighttemp_float }}°C</span><br>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getFutureWeather } from './api/weatherApi'
//组件参数接口
interface weatherProps {
    city: string,
}
const props = withDefaults(defineProps<weatherProps>(), {});
//请求的城市
const { city = '北京' } = props;
//存储天气信息
const weatherList = ref<any>([]);

onMounted(() => {
    getWeather();
})

const getWeather = async () => {
    const result:any = await getFutureWeather(city);
    if (result.code == 200) {
        weatherList.value = result.data[0];
    }
}
</script>

<style  scoped>
.title {
    color: rgb(21, 22, 22);
    font-size: larger;
}

.ant-card {
    background: #9d9d9d;
}
</style>    