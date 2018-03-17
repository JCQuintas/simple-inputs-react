import styled from 'styled-components'

export default styled.div`
  padding: 2px 15px;
  position: relative;
  display: flex;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'text')};
  box-shadow: ${({ disabled }) => (disabled ? 'none' : '0 0 2px rgba(0, 0, 0, 0.15)')};
  background-color: ${({ disabled }) => (disabled ? 'rgb(235, 235, 228)' : 'initial')};
  color: ${({ disabled }) => (disabled ? 'rgb(84, 84, 84)' : 'initial')};
  font: 400 13.3333px Arial;
`
