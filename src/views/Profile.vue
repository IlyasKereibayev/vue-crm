<template>
  <div>
    <div class="page-title">
      <h3>{{ 'profileTitle' | localize }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="description">Имя</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >Введите имя</small>
      </div>

      <div class="switch">
        <label>
          Off
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          On
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import M from 'materialize-css';
import { required } from 'vuelidate/lib/validators';
import localize from '@/filters/localize.filter';

export default {
  name: 'profile',
  metaInfo() {
    return {
      title: localize('profileTitle'),
    };
  },
  data: () => ({
    loading: true,
    name: null,
    isRuLocale: true,
  }),
  validations: {
    name: { required },
  },
  computed: {
    ...mapGetters(['info']),
  },
  mounted() {
    this.name = this.info.name;
    this.isRuLocale = this.info.locale === 'ru-Ru';
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-Ru' : 'en-US',
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style scoped>
  .switch {
    margin-bottom: 2rem;
  }
</style>
