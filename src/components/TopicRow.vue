<template>
  <el-radio :label="topic.id" @click="topic.subscribe()">
    <div>
      <div>
        <el-tag v-for="tag in topic.tagIds" :key="tag" size="mini">{{
          tag
        }}</el-tag>
      </div>
      <div class="header">{{ topic.header }}</div>
      <div class="text">{{ topic.text }}</div>
      <div class="footer">{{ topic.footer }}</div>
    </div>
    <div>
      {{ topic.votes }}
    </div>
  </el-radio>
</template>

<script lang="ts">
import { Topic } from 'studo.js';
export default {
  name: 'TopicRow',
  props: {
    topic: {
      type: Topic,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.el-radio {
  display: flex;
  align-items: center;
  margin: 4px 0 0 0 !important;
  padding: 4px;
  border-radius: 8px;

  &:hover:not(.is-checked) {
    background: #161b22;
  }
}

::v-deep(.el-radio__input) {
  display: none;
}

::v-deep(.el-radio__label) {
  display: flex;
  align-items: center;
  padding: 0px;
}

.el-tag + .el-tag {
  margin-left: 5px;
}
</style>