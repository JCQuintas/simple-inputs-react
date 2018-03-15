import React from 'react'
import { storiesOf } from '@storybook/react'
import StoryComponent from './index.js'

const stories = [
  {
    name: 'Default',
    props: {},
  },
]

const instanceOfStories = storiesOf('COMPONENT_NAME', module)
stories.map(v => instanceOfStories.add(v.name, () => <StoryComponent {...v.props} />))
