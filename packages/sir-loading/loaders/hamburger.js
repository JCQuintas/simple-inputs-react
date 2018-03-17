import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'

const loadAnimation = keyframes`
  0%,
  80%,
  100% {
    box-shadow: inset 0 0 0px 1000px, 0 0;
    height: 4em;
  }
  40% {
    box-shadow: inset 0 0 0px 1000px, 0 -2em;
    height: 5em;
  }
`

const Container = styled.div`
  height: 7em;
  display: flex;
`

const Load = styled.div`
  position: relative;
  margin: 2em auto 0;
  transform: translateZ(0);
  text-indent: -9999em;

  &,
  &:before,
  &:after {
    width: 2em;
    height: 4em;
    animation-fill-mode: both;
    animation: ${loadAnimation} 1s infinite ease-in-out;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
  }

  &:before {
    left: -2.5em;
    animation-delay: -0.16s;
  }

  &:after {
    left: 2.5em;
    animation-delay: 0.16s;
  }
`

class Loader extends PureComponent {
  render() {
    const { children, ...props } = this.props
    return (
      <Container {...props}>
        <Load children={children} />
      </Container>
    )
  }
}

Loader.displayName = 'SIR-Loader-Hamburger'

export default Loader
