import React from 'react'
import { storiesOf } from '@storybook/react'
import Component from './index.js'

const stories = [
  {
    name: 'Default',
    props: {},
  },
]

const instanceOfStories = storiesOf('Slider', module)
stories.map(v => instanceOfStories.add(v.name, () => <Component {...v.props} />))
