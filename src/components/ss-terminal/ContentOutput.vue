<template>
  <div class="content-output">
    <template v-if="output.type === 'text'">
        <!-- tag -->
      <a-tag v-if="outputTagColor" :color="outputTagColor"
        >{{ output.status }}
      </a-tag>
      <!-- 内容 -->
      <span v-if="output.type === 'text'" v-html="smartText(output.text)" />
    </template>
    <component
      :is="output.component"
      v-if="output.type === 'component'"
      v-bind="output.props?output.props :{}"
    />
  </div>
</template>

<script setup lang="ts">
import smartText from "../../utils/smartText";
import OutputType = SsTerminal.OutputType;
import { computed, toRefs } from "vue";

interface OutputProps {
  output: OutputType;
}

const props = defineProps<OutputProps>();
const { output } = toRefs(props);
const outputTagColor = computed((): string => {
  if (!output.value.status) {
    return "";
  }
  switch (output.value.status) {
    case "info":
      return "dodgerblue";
    case "success":
      return "limegreen";
    case "warning":
      return "darkorange";
    case "error":
      return "#69282b";
    case "system":
      return "#bfc4c9";
    default:
      return "";
  }
});
</script>

<style scoped>

/* deep应用场景：
    1、引用第三方组件库，只需要在当前页面修改组件库样式而不污染全局样式。
    在含有scoped的style里写样式对子组件是不生效的
    2、在父组件中的样式无法修改子组件的样式，可以使用深度作用选择器
*/
.content-output :deep(.ant-tag) {
  border-radius: 0;
  font-size: 16px;
  border: none;
}
</style>
