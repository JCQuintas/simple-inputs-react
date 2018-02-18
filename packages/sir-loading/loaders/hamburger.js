import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'

const loadAnimation = keyframes`
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
`

const Load = styled.div`
  color: #000;
  font-size: 2.5px;
  position: relative;
  margin: 2em auto 0;
  transform: translateZ(0);
  text-indent: -9999em;

  &,
  &:before,
  &:after {
    background-color: #000;
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
    return <Load {...this.props} />
  }
}

Loader.displayName = 'SIR-Loader-Hamburger'

export default Loader
