/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  extends: [
      // "plugin:vue/base",
      // "plugin:vue/vue3-essential",
      // "eslint:recommended",
      // "@vue/eslint-config-prettier",
      'plugin:vue/base',
      'eslint:recommended',
      'plugin:vue/vue3-recommended',
      'plugin:vue/essential',
      // 'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'eslint-config-prettier'

  ],
};
