<template>
  <div>
    <Loader v-if="loading"/>
    <p v-else-if="!record" class="center">Записи с id={{$route.params.id}} нет</p>
    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === 'income' ? 'Доход' : 'Расход' }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
            red: record.type === 'outcome',
            green: record.type === 'income'
            }"
          >
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ record.amount | currency('KZT') }}</p>
              <p>Категория: {{ record.categoryName }}</p>

              <small>{{ record.date | date('date') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'detail',
  data: () => ({
    loading: true,
    record: null,
  }),
  async mounted() {
    const { id } = this.$route.params;
    const record = await this.$store.dispatch('fetchRecord', id);
    const category = await this.$store.dispatch('fetchCategory', record.categoryId);
    this.record = {
      ...record,
      categoryName: category.title,
    };
    this.loading = false;
  },
};
</script>
