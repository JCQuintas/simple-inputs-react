import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: blue;
`

class Search extends Component {
  render() {
    return <Container>SIR-Search</Container>
  }
}

Search.displayName = 'SIR-Search'

Search.defaultProps = {}

export default Search
