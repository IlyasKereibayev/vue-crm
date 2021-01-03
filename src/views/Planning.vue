<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ info.bill | currency('KZT') }}</h4>
    </div>
    <Loader v-if="loading"/>
    <p v-else-if="!categories.length" class="center">Категории пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>
    <section v-else>
      <div v-for="c in categories" :key="c.id">
        <p>
          <strong>{{ c.title }}:</strong>
          {{ c.spent | currency('KZT') }} из {{ c.limit | currency('KZT') }}
        </p>
        <div class="progress" v-tooltip="c.tooltip">
          <div
            class="determinate"
            :class="[c.progressColor]"
            :style="{width: c.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import currencyFilter from '@/filters/currency.filter';

export default {
  name: 'planning',
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(['info']),
  },
  async mounted() {
    const categories = await this.$store.dispatch('fetchCategories');
    const records = await this.$store.dispatch('fetchRecords');

    this.categories = categories.map((c) => {
      const spent = records
        .filter((r) => r.categoryId === c.id)
        .filter((r) => r.type === 'outcome')
        .reduce((total, r) => (total + parseInt(r.amount, 0)), 0);

      const percent = (100 * spent) / c.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      let progressColor = 'green';
      if (percent > 60 && percent < 100) {
        progressColor = 'yellow';
      } else if (percent > 100) {
        progressColor = 'red';
      }

      const tooltipValue = c.limit - spent;
      const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'осталось'} ${currencyFilter(Math.abs(tooltipValue))}`;

      return {
        ...c,
        progressPercent,
        progressColor,
        spent,
        tooltip,
      };
    });

    this.loading = false;
  },
};
</script>
