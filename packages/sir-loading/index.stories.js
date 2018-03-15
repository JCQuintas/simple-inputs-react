import React from 'react'
import { storiesOf } from '@storybook/react'
import StoryComponent from './index.js'
import { withKnobs, select, number } from '@storybook/addon-knobs/react'

const typeValues = {
  menu: 'menu',
  hamburger: 'hamburger',
  'dot-spinner': 'dot-spinner',
}

const stories = [
  {
    name: 'Default',
    props: {},
  },
  {
    name: 'With regular CSS',
    props: {},
  },
]

const instanceOfStories = storiesOf('Loading', module).addDecorator(withKnobs)
instanceOfStories.add(stories[0].name, () => {
  const styles = {
    fontSize: number('font-size:', 10, { step: 0.5 }) + 'px',
  }
  return <StoryComponent {...stories[0].props} type={select('Type', typeValues, 'menu')} style={styles} />
})

instanceOfStories.add(stories[1].name, () => {
  const styles = {
    fontSize: number('font-size:', 10, { step: 0.5 }) + 'px',
  }
  const typeValue = select('Type', typeValues, 'menu')
  const classNames = {
    menu: 'test-color',
    hamburger: 'test-background-color test-color',
    'dot-spinner': 'test-color',
  }
  return <StoryComponent {...stories[1].props} type={typeValue} className={classNames[typeValue]} style={styles} />
})
