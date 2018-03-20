import styled from 'styled-components'

export default styled.div`
  background-color: ${({ disabled }) => (disabled ? 'silver' : 'mediumaquamarine')};
  width: ${({ orientation }) => (orientation === 'vertical' ? '100%' : 'auto')};
  height: ${({ orientation }) => (orientation === 'horizontal' ? '100%' : 'auto')};
  position: absolute;
`
