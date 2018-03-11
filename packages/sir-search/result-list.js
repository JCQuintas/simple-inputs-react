import styled from 'styled-components'

export default styled.div`
  z-index: 100;
  position: absolute;
  background-color: white;
  margin-top: 2px;
  overflow: hidden;
  top: 100%;
  left: 0;
  right: 0;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
  max-height: ${props => (props.open ? 'auto' : 0)};
`
