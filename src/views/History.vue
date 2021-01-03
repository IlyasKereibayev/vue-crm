<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>
    <Loader v-if="loading"/>
    <p v-else-if="!records.length" class="center">Записей пока нет.
      <router-link to="/record">Добавить новую</router-link>
    </p>
    <section v-else>
      <HistoryTable :records="items"/>
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      >
      </Paginate>
    </section>
  </div>
</template>
<script>
import HistoryTable from '@/components/HistoryTable.vue';
import paginationMixin from '@/mixins/pagination.mixin';
import { Pie } from 'vue-chartjs';

export default {
  name: 'hisotry',
  extends: Pie,
  components: {
    HistoryTable,
  },
  data: () => ({
    loading: true,
    records: [],
  }),
  mixins: [paginationMixin],
  async mounted() {
    const categories = await this.$store.dispatch('fetchCategories');
    this.records = await this.$store.dispatch('fetchRecords');
    this.setup(categories);
    this.loading = false;
  },
  methods: {
    setup(categories) {
      this.setupPaginations(this.records.map((r) => ({
        ...r,
        categoryName: categories.find((c) => c.id === r.categoryId).title,
        typeClass: r.type === 'income' ? 'green' : 'red',
        typeText: r.type === 'income' ? 'Доход' : 'Расход',
      })));
      this.renderChart({
        labels: categories.map((c) => c.title),
        datasets: [{
          label: '# of Votes',
          data: categories.map((c) => this.records.reduce((total, r) => {
            if (r.categoryId === c.id && r.type === 'outcome') {
              total += +r.amount;
            }
            return total;
          }, 0)),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        }],
      });
    },
  },
};
</script>
