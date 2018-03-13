import React from 'react'
import { storiesOf } from '@storybook/react'
import Component from './index.js'
import { withKnobs, number } from '@storybook/addon-knobs/react'

const stories = [
  {
    name: 'Default',
    props: {
      onChange: v => console.log(v),
      // value: number('value', 0, { step: 0.5 }),
      // min: number('min', 0, { step: 0.5 }),
      // max: number('max', 100, { step: 0.5 }),
      // step: number('step', 10, { step: 0.5 }),
    },
  },
]

const instanceOfStories = storiesOf('Slider', module).addDecorator(withKnobs)
stories.map(v => instanceOfStories.add(v.name, () => <Component {...v.props} />))
