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
      orientation: 'vertical',
    },
  },
]

const instanceOfStories = storiesOf('Slider', module).addDecorator(withKnobs)
instanceOfStories.add(stories[0].name, () => {
  const props = {
    value: number('value', 100, { step: 0.5 }),
    min: number('min', 0, { step: 0.5 }),
    max: number('max', 100, { step: 0.5 }),
    step: number('step', 10, { step: 0.5 }),
  }
  return <Component {...stories[0].props} {...props} />
})

instanceOfStories.add(stories[1].name, () => {
  const props = {
    value: number('value', 100, { step: 0.5 }),
    min: number('min', 0, { step: 0.5 }),
    max: number('max', 100, { step: 0.5 }),
    step: number('step', 10, { step: 0.5 }),
  }
  return <Component {...stories[1].props} {...props} />
})
