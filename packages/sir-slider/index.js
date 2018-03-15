import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Thumb, Track, Container } from './components'

class Slider extends PureComponent {
  containerRef = null
  thumbRef = null
  maxPosition = 0
  grabPosition = 0
  handleDimension = 0
  rangeDimension = 0
  moveEvents = ['mousemove', 'touchmove']
  endEvents = ['mouseup', 'touchend']
  mapping = {
    horizontal: {
      dimension: 'width',
      direction: 'left',
      coordinate: 'pageX',
    },
    vertical: {
      dimension: 'height',
      direction: 'bottom',
      coordinate: 'pageY',
    },
  }
  state = {
    thumbPosition: 0,
    value: 0,
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeEvent)
    this.getSizes()
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.value !== this.props.value ||
      nextProps.min !== this.props.min ||
      nextProps.max !== this.props.max ||
      nextProps.step !== this.props.step
    )
      this.updatePositionFromValue({
        value: nextProps.value,
        min: nextProps.min,
        max: nextProps.max,
      })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEvent)
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

  getMapping(key) {
    const { orientation } = this.props
    return this.mapping[orientation][key]
  }

  getSizes = () => {
    const containerInfo = this.containerRef.getBoundingClientRect()
    const thumbInfo = this.thumbRef.getBoundingClientRect()
    this.thumbDimension = thumbInfo[this.getMapping('dimension')]
    this.containerDimension = containerInfo[this.getMapping('dimension')]
    this.maxPosition = this.containerDimension - this.thumbDimension
    this.grabPosition = this.thumbDimension / 2
  }

  updatePositionFromValue({ value: v, min, max, callChange }) {
    const value = this.clamp(v, min, max)
    const thumbPosition = this.clamp(this.getPositionFromValue(value), 0, this.maxPosition)
    this.setState({ value, thumbPosition }, () => {
      if (callChange) this.onChange()
    })
  }

  cap(position) {
    if (position < 0) return 0
    if (position > this.maxPosition) return this.maxPosition
    return position
  }

  updateValueFromPosition(position) {
    const { min, max } = this.props
    const value = this.clamp(this.getValueFromPosition(this.cap(position)), min, max)
    const thumbPosition = this.clamp(this.getPositionFromValue(value), 0, this.maxPosition)
    this.setState({ value, thumbPosition }, () => this.onChange())
  }

  getPositionFromValue(value) {
    const { max, min } = this.props
    const percentage = (value - min) / (max - min)
    const pos = !Number.isNaN(percentage) ? percentage * this.maxPosition : 0
    return pos
  }

  getValueFromPosition(pos) {
    const { step, max, min, orientation } = this.props
    const isVertical = orientation === 'vertical'
    const percentage = pos / (this.maxPosition || 1)
    const value = step * Math.round(percentage * (max - min) / step) + min
    const decimals = `${step}`.replace('.', '').length - 1
    const returnNumber = isVertical ? max - Number(value.toFixed(decimals)) : Number(value.toFixed(decimals))
    return returnNumber
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
    return { [this.getMapping('direction')]: `${thumbPosition}px` }
  }

  resizeEvent = e => {
    const { value } = this.state
    this.getSizes()
    this.updatePositionFromValue({ value })
  }

  startEvent = e => {
    const { disabled } = this.props
    if (disabled) return null
    if (e.button && e.button !== 0) return null
    this.addEvents()
    if (e.target === this.thumbRef) return null
    this.moveEvent(e)
  }

  moveEvent = e => {
    if (e && e[this.getMapping('coordinate')])
      this.updateValueFromPosition(e[this.getMapping('coordinate')] - this.grabPosition * 2)
  }

  endEvent = e => {
    const { onSlideEnd } = this.props
    const { value } = this.state
    this.moveEvent(e)
    if (onSlideEnd) onSlideEnd(value)
    this.removeEvents()
  }

  render() {
    const { orientation, disabled, value, onChange, onSlideEnd, min, max, step, ...props } = this.props
    return (
      <Container innerRef={r => (this.containerRef = r)} {...props}>
        <Track
          className={disabled ? 'disabled' : undefined}
          onMouseDown={this.startEvent}
          onTouchStart={this.startEvent}
          orientation={orientation}
          disabled={disabled}
        >
          <Thumb
            className={disabled ? 'disabled' : undefined}
            style={this.getPosition()}
            innerRef={r => (this.thumbRef = r)}
            orientation={orientation}
            disabled={disabled}
          />
        </Track>
      </Container>
    )
  }
}

Slider.displayName = 'SIR-Slider'

Slider.propTypes = {
  value: PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onSlideEnd: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
}

Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  orientation: 'horizontal',
}

export default Slider
