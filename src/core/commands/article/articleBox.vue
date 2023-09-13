<template>
    <div> <a-spin :spinning="spinning">
            <InfiniteList :data="articleList" :width="'100%'" :height="500" :itemSize="50" class="article"
                v-slot="{ item, index }" id="infintielist">
                <a style="width: 100%; cursor: pointer; overflow: hidden" @click="handleClick(item.article_id)">
                    <div class="title">
                        {{ item.title }}
                    </div>
                    <div class="brief">
                        {{ item.brief_content }}
                    </div>
                </a>
            </InfiniteList>
        </a-spin></div>
</template>

<script setup lang="ts">
import InfiniteList from 'vue3-infinite-list';
import { getRandomArticle } from "./articleApi"
import { ref, onMounted } from "vue";
import _ from "lodash";

// 声明 porps对象
//组件参数接口
interface articleProps {
    size: number
}
//
const props = withDefaults(defineProps<articleProps>(), {});

//请求的篇数
const { size = 20 } = props;
// 加载中
let spinning = ref(true);
//保存返回的文章数组
let articleList = ref<any>([]);

const getArticles = async () => {
    const data = [...articleList.value];
    const result: any = await getRandomArticle(size);
    if (result.code == 200) {
        //请求成功并返回文章数据
        // console.log(result.data);
        result.data.forEach((item: any) => {
            if (item.item_info.article_info) {
                // //过滤掉广告
                data.push(item.item_info.article_info);
            }
        });
        articleList.value = data;
    }
    // console.log('iam article list', articleList.value);
}

const handleClick = (aid: number) => {
    window.open(`https://juejin.cn/post/${aid}`);
};

//滚动到底发送请求获取新的文章
const scrollEvent = (e: any) => {
    //滚动的像素+容器的高度>=可滚动的总高度（保留10px误差）
    if (e.srcElement.offsetHeight + e.srcElement.scrollTop + 10 >= e.srcElement.scrollHeight) {
        //触发请求新文章
        getArticles();
    }
}

//组件被挂载时请求文章
onMounted(() => {
    getArticles();
    // //使用lodash库节流
    document.getElementById('infintielist')
        ?.addEventListener("scroll", _.throttle(scrollEvent, 200));
    spinning.value = false;
})

</script>

<style scoped>
.title {
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.brief {
    height: 25px;
    font-size: 1rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: #86909c;
}

.article::-webkit-scrollbar,
.article-active::-webkit-scrollbar {
    width: 6px;
}

.article::-webkit-scrollbar-track,
.article-active::-webkit-scrollbar-track {
    background-color: #000;
    border-radius: 10px;
}

.article::-webkit-scrollbar-thumb,
.article-active::-webkit-scrollbar-thumb {
    background-color: #e4e4e4;
    border-radius: 10px;
}

a {
    color: #eb2f96;
}
</style>