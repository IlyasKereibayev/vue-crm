import M from 'materialize-css';

export default {
  install(Vue) {
    Vue.prototype.$message = function message(html) {
      M.toast({ html });
    };
    Vue.prototype.$error = function error(html) {
      M.toast({ html: `Ошибка: ${html}` });
    };
  },
};
