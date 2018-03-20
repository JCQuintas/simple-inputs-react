import styled from 'styled-components'

export default styled.div`
  background-color: ${({ disabled }) => (disabled ? 'silver' : 'mediumaquamarine')};
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
  width: ${({ orientation }) => (orientation === 'vertical' ? '100%' : 'auto')};
  height: ${({ orientation }) => (orientation === 'horizontal' ? '100%' : 'auto')};
  position: absolute;
`
