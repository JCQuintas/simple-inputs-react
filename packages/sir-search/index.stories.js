import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import Component from './index.js'
import { withKnobs, boolean, object, text } from '@storybook/addon-knobs/react'
import debounce from 'lodash.debounce'

class FetchExample extends Component {
  state = {
    data: [],
    loading: false,
  }

  fetchData = debounce(t => {
    fetch(`https://api.github.com/search/users?q=${t}`)
      .then(r => r.json())
      .then(r => {
        const d = r.items.map(v => {
          return {
            title: v.login,
            id: v.id,
          }
        })
        this.setState({ data: d, loading: false })
      })
  }, 300)

  onChange = t => {
    this.setState({ loading: true })
    this.fetchData(t)
  }

  onSelect = v => {
    console.log(v)
  }

  render() {
    return (
      <Fragment>
        <div style={{ marginBottom: 5 }}>Search a GitHub username</div>
        <Component
          onChange={this.onChange}
          data={this.state.data}
          onSelect={this.onSelect}
          loading={this.state.loading}
        />
      </Fragment>
    )
  }
}

const defaultArray = [
  {
    id: 1,
    title: 'One',
  },
  {
    id: 2,
    title: 'Two',
  },
]

const instanceOfStories = storiesOf('Search', module).addDecorator(withKnobs)
instanceOfStories.add('Default', () => (
  <Component
    keepOpen={boolean('keepOpen', false)}
    data={object('data', defaultArray)}
    onChange={console.log}
    onSelect={console.log}
    placeholder={text('placeholder', 'Search')}
    loading={boolean('loading (need search term)', false)}
  />
))

instanceOfStories.add('With github search', () => {
  return <FetchExample />
})
