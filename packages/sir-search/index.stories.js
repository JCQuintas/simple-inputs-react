import React, { Fragment, Component } from 'react'
import { storiesOf } from '@storybook/react'
import StoryComponent, { ResultItem } from './index.js'
import { withKnobs, object, text, select, boolean } from '@storybook/addon-knobs/react'
import debounce from 'lodash.debounce'

const Item = ({ data, ...props }) => {
  return (
    <ResultItem {...props}>
      <img style={{ height: 28, width: 28, marginRight: 5, borderRadius: 14 }} src={data.avatar_url} alt={data.login} />
      <span>{data.login}</span>
    </ResultItem>
  )
}

class FetchExample extends Component {
  state = {
    data: [],
    loading: false,
    value: '',
  }

  fetchData = debounce(t => {
    fetch(`https://api.github.com/search/users?q=${t}`)
      .then(r => r.json())
      .then(r => {
        this.setState({ data: r.items, loading: false })
      })
  }, 300)

  onChange = t => {
    this.setState({ loading: true, value: t }, () => this.fetchData(this.state.value))
  }

  onSelect = v => {
    console.log(v)
    this.setState({ value: v.login })
  }

  render() {
    return (
      <Fragment>
        <div style={{ marginBottom: 5 }}>Search a GitHub username</div>
        <StoryComponent
          onChange={this.onChange}
          data={this.state.data}
          onSelect={this.onSelect}
          loading={this.state.loading}
          value={this.state.value}
          resultItemComponent={Item}
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
    <StoryComponent
      placeholder={text('placeholder', 'Search')}
      disabled={boolean('disabled', false)}
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
