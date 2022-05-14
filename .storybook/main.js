module.exports = {
  stories: ['../src/**/*.story.@(js|tsx|ts)'],
  addons: ['@storybook/addon-knobs', '@storybook/addon-viewport', '@storybook/addon-a11y'],
  core: {
    builder: "webpack5"
  }
};