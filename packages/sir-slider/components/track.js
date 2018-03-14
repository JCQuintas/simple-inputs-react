import styled from 'styled-components'

const color = 'lightgray'
const trackSize = 10
export default styled.div`
  height: ${trackSize}px;
  width: 100%;
  background-color: ${color};
  border-radius: ${trackSize / 2}px;
  position: relative;
  display: flex;
  align-items: center;
`
