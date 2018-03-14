import styled from 'styled-components'

const size = 10
export default styled.div`
  background-color: teal;
  height: ${size}px;
  width: ${size}px;
  border-radius: 100%;
  cursor: pointer;
  position: absolute;
  transition: opacity 0.3s ease;
  touch-action: pan-y;
  &:hover {
    opacity: 0.6;
  }
`
