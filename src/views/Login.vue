<template>
  {{ countryPrefix }}
  <el-form label-width="120px">
    <el-form-item label="Phone number" required>
      <el-col :span="11">
        <el-form-item>
          <el-select
            v-model="countryPrefix"
            allow-create
            default-first-option
            filterable
          >
            <el-option
              v-for="option in countryPrefixes"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="11">
        <el-form-item>
          <el-input v-model="number" placeholder="678 123456789">test</el-input>
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-button type="primary">Send</el-button>
  </el-form>
</template>

<script lang="ts">
export default {
  name: 'Login',
  setup() {
    const countryPrefixes = [
      { label: '🇦🇹 +43 Österreich', value: '+43' },
      { label: '🇩🇪 +49 Deutschland', value: '+49' },
      { label: '🇭🇺 +36 Ungarn', value: '+36' },
      { label: '🇮🇹 +39 Italien', value: '+39' },
      { label: '🇸🇮 +38 Slowenien', value: '+38' },
      { label: '🇭🇷 +38 Kroatien', value: '+38' },
      { label: '🇨🇭 +41 Schweiz', value: '+41' },
      { label: '🇵🇱 +48 Polen', value: '+48' },
    ];
    return { countryPrefixes, countryPrefix: '', number: '' };
  },
};
</script>

<style lang="scss" scoped>
</style>
