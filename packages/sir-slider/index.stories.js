import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import StoryComponent from './index.js'
import { withKnobs, number, boolean } from '@storybook/addon-knobs/react'

const stories = [
  {
    name: 'Default',
    props: {
      onChange: (v, p) => console.log(`value: ${v} -- position: ${p}`),
      onSlideEnd: (v, p) => console.log('SLIDE END -- ', `value: ${v} -- position: ${p}`),
      tabIndex: 0,
    },
  },
  {
    name: 'Vertical',
    props: {
      onChange: (v, p) => console.log(`value: ${v} -- position: ${p}`),
      onSlideEnd: (v, p) => console.log('SLIDE END -- ', `value: ${v} -- position: ${p}`),
      orientation: 'vertical',
      tabIndex: 0,
    },
  },
]

class Example extends Component {
  state = {
    value: 100,
  }

  render() {
    return (
      <div>
        <StoryComponent
          value={this.state.value}
          onChange={value => this.setState({ value })}
          onSlideEnd={(v, p) => console.log('SLIDE END -- ', `value: ${v} -- position: ${p}`)}
        />
        <div>{this.state.value}</div>
      </div>
    )
  }
}

const instanceOfStories = storiesOf('Slider', module).addDecorator(withKnobs)
stories.map(s =>
  instanceOfStories.add(s.name, () => {
    const props = {
      value: number('value', 100, { step: 0.5 }),
      min: number('min', 0, { step: 0.5 }),
      max: number('max', 100, { step: 0.5 }),
      step: number('step', 10, { step: 0.5 }),
      fill: boolean('fill', true),
      disabled: boolean('disabled', false),
    }
    return <StoryComponent {...s.props} {...props} />
  })
)

instanceOfStories.add('Controlled Value', () => <Example />)
