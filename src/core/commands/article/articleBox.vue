<template>

    <a-spin :spinning="spinning">
      <InfiniteList
        :data="articleList"
        :width="'100%'"
        :height=400
        :itemSize="50"
        class="article"
        v-slot="{ item, index }"
        id="infintielist"
      >
        <a
          style="width: 100%; cursor: pointer; overflow: hidden"
          @click="handleClick(item.article_id)">
          <div class="title">
            {{ item.title }}
          </div>
          <div class="brief">
            {{ item.brief_content }}
          </div>
        </a>
      </InfiniteList>
    </a-spin>

</template>

<script setup lang="ts">
import InfiniteList from "vue3-infinite-list"
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
let articleList = ref([]);
const getArticles = async () => {
    articleList.value = await getRandomArticle(size);     
}

const handleClick = (aid: number) => {
  window.open(`https://juejin.cn/post/${aid}`);
};

onMounted(() => {
    getArticles();
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
</style>