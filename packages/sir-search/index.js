import React, { PureComponent } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
  background-color: pink;
`

class Search extends PureComponent {
  render() {
    return <Container>SIR-Search</Container>
  }
}

Search.displayName = 'SIR-Search'

Search.defaultProps = {}

export default Search
