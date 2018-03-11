import styled from 'styled-components'

export default styled.div`
  padding: 5px 15px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  ${props => (props.selected ? rgba(0, 0, 0, 0.1) : undefined)} &:hover, &:focus {
    outline: none;
    background-color: rgba(0, 0, 0, 0.1);
  }
`
