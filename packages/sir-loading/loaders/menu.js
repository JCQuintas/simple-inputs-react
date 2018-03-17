import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'

const loadAnimation = keyframes`
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
`

const Load = styled.div`
  position: relative;
  margin: 0 auto;
  transform: translateZ(0) translateY(-100%);
  text-indent: -9999em;

  &,
  &:before,
  &:after {
    border-radius: 100%;
    width: 2.5em;
    height: 2.5em;
    animation-fill-mode: both;
    animation: ${loadAnimation} 1.4s infinite ease-in-out;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
  }

  &:before {
    left: -3em;
    animation-delay: -0.16s;
  }

  &:after {
    left: 3em;
    animation-delay: 0.16s;
  }
`

class Loader extends PureComponent {
  render() {
    return <Load {...this.props} />
  }
}

Loader.displayName = 'SIR-Loader-Menu'

export default Loader
