import React, { PureComponent } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Loading from './loading'
import Input from './input'
import Placeholder from './placeholder'
import ResultList from './result-list'
import ResultItem from './result-item'
import NoData from './no-data'
import Container from './container'

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
      onFocus: this.focus(true),
      onBlur: this.focus(false),
      onKeyDown: this.inputKeyDown,
    }

    if (inputComponent) return React.createElement(inputComponent, props)

    return <Input {...props} tabIndex="0" className={inputClassName} />
  }

  // hover = index => {
  //   this.setState({ selectedIndex: index })
  // }

  renderResultItem(data, index) {
    const { resultItemClassName, resultItemComponent } = this.props

    const props = {
      key: data.id || index,
      onClick: this.listClickOrKeyDown(data, true),
      onFocus: this.focus(true),
      onBlur: this.focus(false),
      onKeyDown: this.listClickOrKeyDown(data, false),
      // onMouseEnter: this.hover(index),
      data,
    }

    if (resultItemComponent) return React.createElement(resultItemComponent, props)

    return (
      <ResultItem tabIndex="0" className={resultItemClassName} {...props}>
        {data.title}
      </ResultItem>
    )
  }

  renderResults() {
    const { resultClassName, resultsComponent, keepOpen, loading, data } = this.props
    const { search, inputHasFocus } = this.state

    const props = {
      innerRef: r => (this.resultsComponent = r),
      value: search,
      open: inputHasFocus || keepOpen,
      onFocus: this.focus(true),
      onBlur: this.focus(false),
    }

    return (
      <ResultList {...props} className={resultClassName}>
        {!loading && search && data && data.length === 0 && this.renderNoData()}
        {!loading && data && data.length > 0 && data.map((v, i) => this.renderResultItem(v, i))}
      </ResultList>
    )
  }

  // Component 'reaction' logic

  inputChange = e => {
    const { onChange } = this.props
    this.setState({ search: e.target.value }, () => {
      if (onChange) onChange(this.state.search)
    })
  }

  focus = isFocus => e => {
    this.setState({ inputHasFocus: isFocus })
  }

  inputKeyDown = e => {
    if (e && e.key === 'ArrowDown') {
      if (this.resultsComponent && this.resultsComponent.firstElementChild) {
        e.preventDefault()
        this.resultsComponent.firstElementChild.focus()
      }
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

  onSelect(data) {
    const { onSelect } = this.props
    this.setState({ inputHasFocus: false })
    if (onSelect) onSelect(data)
  }

  listClickOrKeyDown = (data, isClick) => e => {
    if (e && !isClick) {
      if (e.key === 'Enter') {
        this.onSelect(data)
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        this.arrowKeyFocusChange('next', e)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        this.arrowKeyFocusChange('previous', e)
      }
    } else {
      this.onSelect(data)
    }
  }

  render() {
    const { className, loading } = this.props
    const { search, inputHasFocus } = this.state
    return (
      <Container className={className}>
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
