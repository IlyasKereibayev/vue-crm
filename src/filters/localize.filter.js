import store from '../store';

const locales = {
  'ru-Ru': {
    profileTitle: 'Профиль',
  },
  'en-US': {
    profileTitle: 'Profile',
  },
};

export default function localizeFilter(key) {
  const locale = store.getters.info.locale || 'ru-Ru';
  return locales[locale][key] || `[Localize error]: key ${key} not found`;
}
