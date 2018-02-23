import React, { PureComponent } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Loading from '@simple-inputs-react/loading'

const Container = styled.div`
  padding: 2px 15px;
  position: relative;
  display: flex;
  align-items: center;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
`

const PlaceholderContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  ${'' /* transform: translate(-50%, -50%); */} pointer-events: none;
`

const Input = styled.input`
  background-color: transparent;
  width: 100%;
  border: none;
  overflow: hidden;

  &:focus {
    outline: none;
  }
`

const ResultContainer = styled.div`
  z-index: 100;
  position: absolute;
  background-color: white;
  margin-top: 2px;
  overflow: hidden;
  top: 100%;
  left: 0;
  right: 0;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
  max-height: ${props => (props.open ? '1000px' : 0)};
`

const ResultItem = styled.div`
  padding: 5px 15px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover,
  &:focus {
    outline: none;
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const StyledLoading = styled(Loading)`
  margin-right: 3em;
  position: absolute;
  right: 15px;
  font-size: 3px;
`

const NoData = styled.div`
  padding: 5px 15px;
`

class Search extends PureComponent {
  inputComponent = null
  resultsComponent = null
  state = {
    search: '',
    inputHasFocus: null,
  }

  renderPlaceholder() {
    const { placeholder } = this.props
    if (!placeholder || typeof placeholder === 'string')
      return (
        <PlaceholderContainer>
          <span>{placeholder}</span>
        </PlaceholderContainer>
      )
    return React.createElement(placeholder)
  }

  renderLoading() {
    const { loadingComponent, loadingClassName, loadingType } = this.props
    if (loadingComponent) return React.createElement(loadingComponent)
    return <StyledLoading type={loadingType || 'menu'} className={loadingClassName} />
  }

  renderNoData() {
    const { noDataComponent, noDataClassName, noDataText } = this.props
    if (noDataComponent) return React.createElement(noDataComponent)
    return <NoData className={noDataClassName}>{noDataText}</NoData>
  }

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
    const {
      className,
      data,
      keepOpen,
      inputClassName,
      resultContainerClassName,
      resultItemClassName,
      loading,
    } = this.props
    const { search, inputHasFocus } = this.state
    return (
      <Container className={className}>
        {search === '' && !inputHasFocus && this.renderPlaceholder()}
        {loading && search && this.renderLoading()}
        <Input
          innerRef={r => (this.inputComponent = r)}
          value={search}
          onChange={this.inputChange}
          onFocus={this.focus(true)}
          onBlur={this.focus(false)}
          onKeyDown={this.inputKeyDown}
          tabIndex="0"
          className={inputClassName}
        />
        <ResultContainer
          innerRef={r => (this.resultsComponent = r)}
          onFocus={this.focus(true)}
          onBlur={this.focus(false)}
          open={inputHasFocus || keepOpen}
          className={resultContainerClassName}
        >
          {!loading && search && data && data.length === 0 && this.renderNoData()}
          {!loading &&
            data &&
            data.length > 0 &&
            data.map(v => (
              <ResultItem
                key={v.id}
                tabIndex="0"
                onClick={this.listClickOrKeyDown(v, true)}
                onFocus={this.focus(true)}
                onBlur={this.focus(false)}
                onKeyDown={this.listClickOrKeyDown(v, false)}
                className={resultItemClassName}
              >
                {v.title}
              </ResultItem>
            ))}
        </ResultContainer>
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
  loading: PropTypes.bool,
  loadingComponent: PropTypes.func,
  loadingClassName: PropTypes.string,
  loadingType: PropTypes.string,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  className: PropTypes.string,
  data: PropTypes.array,
  keepOpen: PropTypes.bool,
  inputClassName: PropTypes.string,
  resultContainerClassName: PropTypes.string,
  resultItemClassName: PropTypes.string,
  noDataComponent: PropTypes.func,
  noDataClassName: PropTypes.string,
  noDataText: PropTypes.string,
}

export default Search
