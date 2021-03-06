import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Thumb, Track, Container, Fill } from './components'

class Slider extends PureComponent {
  containerRef = null
  thumbRef = null
  maxPosition = 0
  grabPosition = 0
  fillPosition = 0
  handleDimension = 0
  rangeDimension = 0
  moveEvents = ['mousemove', 'touchmove']
  endEvents = ['mouseup', 'touchend']
  mapping = {
    horizontal: {
      dimension: 'width',
      direction: 'left',
      coordinate: 'pageX',
      fill: {
        start: 'left',
        end: 'right',
      },
      keyEventCodes: {
        increase: 'ArrowRight',
        decrease: 'ArrowLeft',
      },
    },
    vertical: {
      dimension: 'height',
      direction: 'bottom',
      coordinate: 'pageY',
      fill: {
        start: 'bottom',
        end: 'top',
      },
      keyEventCodes: {
        increase: 'ArrowUp',
        decrease: 'ArrowDown',
      },
    },
  }
  state = {
    thumbPosition: 0,
    value: 0,
  }

  componentDidMount() {
    const { value, min, max } = this.props
    window.addEventListener('resize', this.resizeEvent)
    this.getSizes()
    this.updatePositionFromValue({ value, min, max })
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
    const { value, thumbPosition } = this.state
    if (onChange) onChange(value, thumbPosition)
  }

  clamp(val, min, max) {
    return val > max ? max : val < min ? min : val
  }

  getPosition() {
    const { thumbPosition } = this.state
    return { [this.getMapping('direction')]: `${thumbPosition}px` }
  }

  getFillPosition() {
    const { thumbPosition } = this.state
    return {
      [this.getMapping('fill').start]: 0,
      [this.getMapping('fill').end]: `${this.containerDimension - (thumbPosition + this.thumbDimension / 2)}px`,
    }
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
    const { value, thumbPosition } = this.state
    if (onSlideEnd) onSlideEnd(value, thumbPosition)
    this.removeEvents()
  }

  step = isIncrease => {
    const { value } = this.state
    const { step, min, max } = this.props
    if (isIncrease) {
      const increase = value + step
      if (increase > max) return null
      this.updatePositionFromValue({
        value: increase,
        min,
        max,
      })
    } else {
      const decrease = value - step
      if (decrease < min) return null
      this.updatePositionFromValue({
        value: decrease,
        min,
        max,
      })
    }
  }

  preventDefault = e => e.preventDefault()

  keyEvent = e => {
    const codes = this.getMapping('keyEventCodes')
    if (e && e.key) {
      if (e.key === codes.increase) return this.step(true)
      if (e.key === codes.decrease) return this.step(false)
    }
  }

  render() {
    const { orientation, disabled, value, onChange, onSlideEnd, min, max, step, fill, ...props } = this.props
    return (
      <Container
        innerRef={r => (this.containerRef = r)}
        {...props}
        onKeyDown={this.keyEvent}
        className={disabled ? 'disabled' : undefined}
      >
        <Track
          onMouseDown={this.startEvent}
          onTouchStart={this.startEvent}
          onDragStart={this.preventDefault}
          orientation={orientation}
          className={disabled ? 'disabled' : undefined}
          disabled={disabled}
        >
          {fill && (
            <Fill
              style={this.getFillPosition()}
              orientation={orientation}
              className={disabled ? 'disabled' : undefined}
              disabled={disabled}
            />
          )}
          <Thumb
            style={this.getPosition()}
            innerRef={r => (this.thumbRef = r)}
            orientation={orientation}
            className={disabled ? 'disabled' : undefined}
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
  fill: PropTypes.bool,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
}

Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  fill: true,
  orientation: 'horizontal',
}

export default Slider
