import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Thumb, Track, Container } from './components'

class Slider extends PureComponent {
  containerRef = null
  thumbRef = null
  maxPosition = 0
  grabPosition = 0
  moveEvents = ['mousemove', 'touchmove']
  endEvents = ['mouseup', 'touchend']
  state = {
    thumbPosition: 0,
    value: 0,
  }

  componentDidMount() {
    window.addEventListener('resize', this.getSizes)
    this.getSizes()
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.value !== this.props.value ||
      nextProps.min !== this.props.min ||
      nextProps.max !== this.props.max ||
      nextProps.step !== this.props.step
    )
      this.updateValues(nextProps.value, nextProps.min, nextProps.max)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getSizes)
    this.removeEvents()
  }

  addEvents() {
    this.moveEvents.map(v => window.addEventListener(v, this.moveEvent))
    this.endEvents.map(v => window.addEventListener(v, this.endEvent))
  }

  removeEvents() {
    this.moveEvents.map(v => window.removeEventListener(v, this.moveEvent))
    this.endEvents.map(v => window.removeEventListener(v, this.endEvent))
  }

  getSizes = () => {
    // const { min, max, value } = this.props
    const containerInfo = this.containerRef.getBoundingClientRect()
    const thumbInfo = this.thumbRef.getBoundingClientRect()
    this.maxPosition = containerInfo.width - thumbInfo.width
    this.grabPosition = thumbInfo.width / 2
    // this.updateValues(value, min, max)
  }

  getPercentOfMaxValue(position) {
    return position * 100 / this.maxPosition
  }

  updateValues(value, min, max) {
    const clampedValue = this.clamp(value, min, max)
    this.setState({
      value: clampedValue,
      thumbPosition: this.getPositionFromValue(clampedValue),
    })
  }

  cap(position) {
    if (position < 0) return 0
    if (position > this.maxPosition) return this.maxPosition
    return position
  }

  setPosition(position) {
    const value = this.getValueFromPosition(this.cap(position))
    const newPosition = this.getPositionFromValue(value)
    this.setState({ thumbPosition: newPosition, value }, () => this.onChange())
  }

  getPositionFromValue(value) {
    const { max, min } = this.props
    const percentage = (value - min) / (max - min)
    const pos = !Number.isNaN(percentage) ? percentage * this.maxPosition : 0
    return pos
  }

  getValueFromPosition(pos) {
    const { step, max, min } = this.props
    const percentage = pos / (this.maxPosition || 1)
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
    return `${thumbPosition}px`
  }

  startEvent = e => {
    // console.log('started', e.pageX, e.pageY)
    if (e.button && e.button !== 0) return null
    this.addEvents()
    if (e.target === this.thumbRef) return null
    this.moveEvent(e)
  }

  moveEvent = e => {
    // console.log('moved', e.pageX)
    if (e && e.pageX) this.setPosition(e.pageX - this.grabPosition * 2)
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
  min: 0,
  max: 100,
  step: 1,
}

export default Slider
