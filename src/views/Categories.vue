<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div v-else class="row">
        <div class="col s12 m6">
          <CreateCategory @created="addNewCategory"/>
        </div>
        <div class="col s12 m6">
          <EditCategory
            v-if="categories.length"
            :categories="categories"
            :key="categories.length + updateCount"
            @edited="editedCategory"
          />
          <p v-else class="center">Категории пока нет</p>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import CreateCategory from '@/components/CreateCategory.vue';
import EditCategory from '@/components/EditCategory.vue';

export default {
  components: {
    EditCategory, CreateCategory,
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0,
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    editedCategory(categoryData) {
      const idx = this.categories.findIndex((c) => c.id === categoryData.id);
      this.categories[idx].title = categoryData.title;
      this.categories[idx].limit = categoryData.limit;
      this.updateCount += 1;
    },
  },
};
</script>
