const storageKey = 'theme';

const getPreference = () => 
  localStorage.getItem(storageKey) ??
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
};

const reflectPreference = () => {
  document.documentElement.setAttribute('data-theme', theme.value);
  document.documentElement.classList.toggle('dark', theme.value === 'dark');
  document.documentElement.classList.toggle('light', theme.value === 'light');
  document.querySelector('#theme-toggle')?.setAttribute('aria-label', theme.value);
};

const theme = {
  value: getPreference(),
};

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  setPreference();
};

reflectPreference();

window.onload = () => {
  reflectPreference();

  document.querySelector('#theme-toggle')?.addEventListener('click', toggleTheme);
};

window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({ matches: isDark }) => {
    theme.value = isDark ? 'dark' : 'light';
    setPreference();
  });