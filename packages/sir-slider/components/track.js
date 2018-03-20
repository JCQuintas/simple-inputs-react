import styled from 'styled-components'

const trackSize = 10
export default styled.div`
  width: ${({ orientation }) => (orientation === 'horizontal' ? '100%' : `${trackSize}px`)};
  height: ${({ orientation }) => (orientation === 'vertical' ? '100%' : `${trackSize}px`)};
  min-width: ${({ orientation }) => (orientation === 'horizontal' ? '100px' : `auto`)};
  min-height: ${({ orientation }) => (orientation === 'vertical' ? '100px' : `auto`)};
  background-color: lightgray;
  border-radius: ${trackSize / 2}px;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
`
