import styled from 'styled-components'

const size = 10
export default styled.div`
  background-color: ${({ disabled }) => (disabled ? 'darkgray' : 'teal')};
  height: ${size}px;
  width: ${size}px;
  border-radius: 100%;
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
  position: absolute;
  transition: opacity 0.3s ease;
  touch-action: ${({ orientation }) => (orientation === 'vertical' ? 'pan-y' : 'pan-x')};
  &:hover {
    opacity: 0.6;
  }
`
