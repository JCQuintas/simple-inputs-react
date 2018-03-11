import { configure, setAddon } from '@storybook/react'
import infoAddon from '@storybook/addon-info'
import { setOptions } from '@storybook/addon-options'

// automatically import all files ending in *.stories.js
const req = require.context('../packages', true, /.stories.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

setOptions({
  name: 'Simple Inputs React',
  url: 'https://test.com',
  goFullScreen: false,
  showStoriesPanel: true,
  showAddonPanel: true,
  showSearchBox: false,
  addonPanelInRight: true,
  sortStoriesByKind: true,
})

setAddon(infoAddon)

configure(loadStories, module)
