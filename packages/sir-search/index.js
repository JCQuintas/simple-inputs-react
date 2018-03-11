import React, { PureComponent } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Placeholder, Input, ResultList, ResultItem, NoData, Loading, Container } from './components'

class Search extends PureComponent {
  inputComponent = null
  resultsComponent = null
  state = {
    search: '',
    inputHasFocus: null,
    selectedIndex: -1,
  }

  componentDidMount() {
    const { value } = this.props
    if (typeof value === 'string') this.setState({ search: value })
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps
    if (typeof value === 'string') this.setState({ search: value })
  }

  renderPlaceholder() {
    const { placeholder, placeholderClassName } = this.props
    if (!placeholder || typeof placeholder === 'string')
      return (
        <Placeholder className={placeholderClassName}>
          <span>{placeholder}</span>
        </Placeholder>
      )
    return React.createElement(placeholder)
  }

  renderLoading() {
    const { loadingComponent, loadingClassName, loadingType } = this.props
    if (loadingComponent) return React.createElement(loadingComponent)
    return <Loading type={loadingType || 'menu'} className={loadingClassName} />
  }

  renderNoData() {
    const { noDataComponent, noDataClassName, noDataText } = this.props
    if (noDataComponent) return React.createElement(noDataComponent)
    return <NoData className={noDataClassName}>{noDataText}</NoData>
  }

  renderInput() {
    const { inputClassName, inputComponent } = this.props
    const { search } = this.state

    const props = {
      innerRef: r => (this.inputComponent = r),
      value: search,
      onChange: this.inputChange,
      onClick: this.focus(true),
      onKeyDown: this.inputKeyDown,
    }

    if (inputComponent) return React.createElement(inputComponent, props)

    return <Input {...props} tabIndex="0" className={inputClassName} />
  }

  renderResults() {
    const { resultClassName, resultsComponent, keepOpen, loading, data } = this.props
    const { search, inputHasFocus } = this.state

    const props = {
      innerRef: r => (this.resultsComponent = r),
      value: search,
      open: inputHasFocus || keepOpen,
      onMouseLeave: this.hover(-1),
    }

    return (
      <ResultList {...props} className={resultClassName}>
        {!loading && search && data && data.length === 0 && this.renderNoData()}
        {!loading && data && data.length > 0 && data.map((v, i) => this.renderResultItem(v, i))}
      </ResultList>
    )
  }

  renderResultItem(data, index) {
    const { resultItemClassName, resultItemComponent } = this.props
    const { selectedIndex } = this.state

    const props = {
      key: data.id || index,
      onMouseDown: this.listClick,
      onMouseOver: this.hover(index),
      selected: selectedIndex === index,
      data,
    }

    if (resultItemComponent) return React.createElement(resultItemComponent, props)

    return (
      <ResultItem className={resultItemClassName} {...props}>
        {data.title}
      </ResultItem>
    )
  }

  // Component 'reaction' logic

  inputChange = e => {
    const { onChange } = this.props
    this.setState({ search: e.target.value, inputHasFocus: true }, () => {
      if (onChange) onChange(this.state.search)
    })
  }

  hover = index => e => {
    this.selectIndex(index)
  }

  selectIndex(index) {
    const { data } = this.props
    if (index > data.length - 1) {
      this.setState({ selectedIndex: -1 })
    } else if (index < -1) {
      this.setState({ selectedIndex: data.length - 1 })
    } else {
      this.setState({ selectedIndex: index })
    }
  }

  focus = isFocus => e => this.setState({ inputHasFocus: isFocus })

  inputKeyDown = e => {
    const { data } = this.props
    const { selectedIndex } = this.state
    if (!e) return null
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      this.setState({ inputHasFocus: true })
      this.selectIndex(selectedIndex + 1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      this.selectIndex(selectedIndex - 1)
    } else if (e.key === 'Enter') {
      this.onSelect()
    }
  }

  arrowKeyFocusChange(direction, e) {
    e.preventDefault()
    if (document.activeElement && document.activeElement[`${direction}ElementSibling`]) {
      document.activeElement[`${direction}ElementSibling`].focus()
    } else if (direction === 'previous') {
      this.inputComponent.focus()
    }
  }

  onSelect() {
    const { onSelect, data } = this.props
    const { selectedIndex } = this.state
    this.setState({ inputHasFocus: false })
    if (data && selectedIndex >= 0 && onSelect) onSelect(data[selectedIndex])
  }

  listClick = e => this.onSelect()

  render() {
    const { className, loading } = this.props
    const { search, inputHasFocus } = this.state
    return (
      <Container className={className} onFocus={this.focus(true)} onBlur={this.focus(false)}>
        {search === '' && !inputHasFocus && this.renderPlaceholder()}
        {loading && search && this.renderLoading()}
        {this.renderInput()}
        {this.renderResults()}
      </Container>
    )
  }
}

Search.displayName = 'SIR-Search'

Search.defaultProps = {
  placeholder: 'Search',
  noDataText: 'No data',
}

Search.propTypes = {
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  placeholderClassName: PropTypes.string,
  value: PropTypes.string,
  loading: PropTypes.bool,
  loadingComponent: PropTypes.func,
  loadingClassName: PropTypes.string,
  loadingType: PropTypes.string,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  className: PropTypes.string,
  data: PropTypes.array,
  keepOpen: PropTypes.bool,
  resultClassName: PropTypes.string,
  resultItemClassName: PropTypes.string,
  noDataComponent: PropTypes.func,
  noDataClassName: PropTypes.string,
  noDataText: PropTypes.string,
  inputClassName: PropTypes.string,
  inputComponent: PropTypes.func,
  resultItemClassName: PropTypes.string,
  resultItemComponent: PropTypes.func,
  resultClassName: PropTypes.string,
  resultsComponent: PropTypes.func,
}

export default Search
export { Placeholder, Input, ResultList, ResultItem, NoData, Loading }
