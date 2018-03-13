import React, { PureComponent } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const size = 10
const Container = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: ${size + 10}px;
`

const Thumb = styled.div`
  background-color: teal;
  height: ${size}px;
  width: ${size}px;
  border-radius: 100%;
  cursor: pointer;
  position: absolute;
  transform: translateX(-50%);
  transition: opacity 0.3s ease;
  touch-action: pan-y;
  &:hover {
    opacity: 0.6;
  }
`
const color = 'lightgray'
const trackSize = 10
const Track = styled.div`
  height: ${trackSize}px;
  width: 100%;
  background-color: ${color};
  border-radius: ${trackSize / 2}px;
  position: relative;
  display: flex;
  align-items: center;
`

class Slider extends PureComponent {
  containerRef = null
  thumbRef = null
  containerInfo = {}
  maxValue = 0
  minValue = 0
  thumbInfo = {}
  state = {
    thumbPosition: 0,
    value: 0,
  }

  componentDidMount() {
    window.addEventListener('resize', this.getSizes)
    this.getSizes()
  }

  componentDidUpdate() {
    this.getSizes()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getSizes)
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

  getSizes = () => {
    this.containerInfo = this.containerRef.getBoundingClientRect()
    this.thumbInfo = this.thumbRef.getBoundingClientRect()
    this.maxValue = this.containerInfo.right - this.containerInfo.left
    this.minValue = 0
  }

  getPercentOfMaxValue(position) {
    return position * 100 / this.maxValue
  }

  cap(position) {
    const { left, right } = this.containerInfo
    if (position < left) return 0
    if (position > right) return this.maxValue
    return position
  }

  setPosition(position) {
    const value = this.getValueFromPosition(this.cap(position))
    const newPosition = this.getPercentOfMaxValue(this.getPositionFromValue(value))
    this.setState({ thumbPosition: newPosition, value }, () => this.onChange())
  }

  getPositionFromValue(value) {
    const { max, min } = this.props
    const percentage = (value - min) / (max - min)
    const pos = !Number.isNaN(percentage) ? percentage * this.maxValue : 0
    return pos
  }

  getValueFromPosition(pos) {
    const { step, max, min } = this.props
    const percentage = pos / (this.maxValue || 1)
    const value = step * Math.round(percentage * (max - min) / step) + min
    const decimals = `${step}`.replace('.', '').length - 1
    return Number(value.toFixed(decimals))
  }

  onChange() {
    const { onChange } = this.props
    const { value } = this.state
    if (onChange) onChange(value)
  }

  clamp(val, min, max) {
    return val > max ? max : val < min ? min : val
  }

  getPosition() {
    const { thumbPosition } = this.state
    return `${this.clamp(thumbPosition, 0, 100)}%`
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
      <Container innerRef={r => (this.containerRef = r)}>
        <Track onMouseDown={this.startEvent} onTouchStart={this.startEvent}>
          <Thumb style={{ left: this.getPosition() }} innerRef={r => (this.thumbRef = r)} />
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
