import React from 'react'
import { storiesOf } from '@storybook/react'
import Component from './index.js'
import { withKnobs, number } from '@storybook/addon-knobs/react'

const stories = [
  {
    name: 'Default',
    props: {
      onChange: v => console.log(v),
      onSlideEnd: v => console.log('SLIDE END: ', v),
    },
  },
  {
    name: 'Vertical',
    props: {
      onChange: v => console.log(v),
      onSlideEnd: v => console.log('SLIDE END: ', v),
      orientation: 'vertical',
    },
  },
]

const instanceOfStories = storiesOf('Slider', module).addDecorator(withKnobs)
stories.map(s =>
  instanceOfStories.add(s.name, () => {
    const props = {
      value: number('value', 100, { step: 0.5 }),
      min: number('min', 0, { step: 0.5 }),
      max: number('max', 100, { step: 0.5 }),
      step: number('step', 10, { step: 0.5 }),
    }
    return <Component {...s.props} {...props} />
  })
)
