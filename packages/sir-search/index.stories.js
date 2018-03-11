import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import Component from './index.js'
import { withKnobs, boolean, object, text, select } from '@storybook/addon-knobs/react'
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

const searchStates = {
  none: 'none',
  loading: 'loading',
  keepOpen: 'keepOpen',
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
instanceOfStories.add('Default', () => {
  const searchState = select('state', searchStates, 'none')
  const value = text('search term', '')
  return (
    <Component
      placeholder={text('placeholder', 'Search')}
      keepOpen={searchState === 'keepOpen'}
      loading={searchState === 'loading'}
      data={object('data', defaultArray)}
      value={value ? value : searchState === 'loading' ? 'needed search term' : ''}
      onChange={console.log}
      onSelect={console.log}
    />
  )
})

instanceOfStories.add('With github search', () => {
  return <FetchExample />
})
