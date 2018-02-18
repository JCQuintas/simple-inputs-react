import React from 'react'
import { storiesOf } from '@storybook/react'
import Component from './index.js'
import { withKnobs, select } from '@storybook/addon-knobs/react'

const typeValues = {
  menu: 'menu',
  hamburger: 'hamburger',
  'dot-spinner': 'dot-spinner',
}

const defaultValue = 'menu'
const groupId = 'TYPE-ID'

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
  return <Component {...stories[0].props} type={select('Type', typeValues, defaultValue, groupId)} />
})

instanceOfStories.add(stories[1].name, () => {
  const typeValue = select('Type', typeValues, defaultValue, groupId)
  const classNames = {
    menu: 'test-color',
    hamburger: 'test-background-color test-color',
    'dot-spinner': 'test-color',
  }
  return <Component {...stories[1].props} type={typeValue} className={classNames[typeValue]} />
})
