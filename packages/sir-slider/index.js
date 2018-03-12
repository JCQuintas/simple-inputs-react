import React, { PureComponent } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const size = 20
const Container = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: ${size + 10}px;
`

const Thumb = styled.div.attrs({
  style: props => ({
    left: props.left,
    right: props.right,
  }),
})`
  background-color: teal;
  height: ${size}px;
  width: ${size}px;
  border-radius: ${size / 2}px;
  cursor: pointer;
  position: absolute;
  transform: translateY(-25%) translateX(-50%);
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.6;
  }
`

const Track = styled.div`
  height: 10px;
  width: 100%;
  background-color: lightgray;
  border-radius: 5px;
`

class Slider extends PureComponent {
  containerComponent = null
  left = 0
  right = 0
  maxValue = 0
  state = {
    thumbPosition: 0,
  }

  componentDidMount() {
    this.getParentSize()
  }

  componentDidUpdate() {
    this.getParentSize()
  }

  componentWillUnmount() {
    this.removeEvents()
  }

  addEvents() {
    window.addEventListener('mousemove', this.moveEvent)
    window.addEventListener('mouseup', this.endEvent)
    window.addEventListener('touchmove', this.moveEvent)
    window.addEventListener('touchend', this.endEvent)
  }

  removeEvents() {
    window.removeEventListener('mousemove', this.moveEvent)
    window.removeEventListener('mouseup', this.endEvent)
    window.removeEventListener('touchmove', this.moveEvent)
    window.removeEventListener('touchend', this.endEvent)
  }

  getParentSize() {
    const rect = this.containerComponent.getBoundingClientRect()
    this.left = rect.left
    this.right = rect.right
    this.maxValue = rect.right - rect.left
  }

  setPosition(position) {
    if (position > this.maxValue) this.setState({ thumbPosition: this.maxValue })
    if (position < this.left) this.setState({ thumbPosition: 0 })
    if (position <= this.maxValue && position >= this.left) this.setState({ thumbPosition: position - this.left })
  }

  getPosition() {
    const { thumbPosition } = this.state
    return { left: Math.max(0, thumbPosition) }
  }

  startEvent = e => {
    // console.log('started', e.pageX, e.pageY)
    this.moveEvent(e)
    this.addEvents()
  }

  moveEvent = e => {
    // console.log('moved', e.pageX)
    if (e && e.pageX) this.setPosition(e.pageX)
  }

  endEvent = e => {
    // console.log('ended', e.pageX, e.pageY)
    this.removeEvents()
  }

  render() {
    return (
      <Container innerRef={r => (this.containerComponent = r)}>
        <Track onMouseDown={this.startEvent} onTouchStart={this.startEvent}>
          <Thumb {...this.getPosition()} />
        </Track>
      </Container>
    )
  }
}

Slider.displayName = 'SIR-Slider'

Slider.propTypes = {
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
}

Slider.defaultProps = {
  value: 50,
  min: 0,
  max: 100,
  step: 1,
}

export default Slider
