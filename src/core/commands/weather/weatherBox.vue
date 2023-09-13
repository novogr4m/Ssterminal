<template>
    <div style="padding: 20px">
        <a-row :gutter="16">
            <a-col :span="16" v-for="(item, index) in weatherList" :key="index">
                <a-card :bordered="false">
                    <template #title><strong>{{ item.province }}——{{ item.city }}</strong></template>
                    <strong class="title">天气：</strong><span>{{ item.weather }}</span><br>
                    <strong class="title">温度：</strong> <span>{{ item.temperature_float }}°C</span><br>
                    <strong class="title">风向：</strong><span>{{ item.winddirection }}风</span><br>
                    <strong class="title">风力：</strong><span>{{ item.windpower }}级</span><br>
                    <strong class="title">最后更新时间：</strong><span>{{ item.reporttime }}</span>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getNowWeather } from './api/weatherApi'

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
    const result:any = await getNowWeather(city);
    if (result.code == 200) {
        weatherList.value = result.data;
    }
    console.log(weatherList.value,'dwqwd');
    
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