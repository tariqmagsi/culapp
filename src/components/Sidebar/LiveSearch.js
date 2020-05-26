import styled from 'styled-components'

const LiveSearch = styled.div`
  position: relative;
`

const Items = styled.ul`
  width: 100%;
  max-height: 200px;
  border: 1px solid #dedede;
  border-radius: 3px;
  box-sizing: border-box;
  overflow-y: auto;
  position: absolute;
  padding: 0;
  margin: 0;
`

const Item = styled.li`
  background: ${props => (props.active ? '#e8ebef' : '#fff')};
  padding: 10px;
  cursor: pointer;
  list-style-type: none
  :hover {
    background: #e8ebef !important;
  }
`
LiveSearch.Items = Items
LiveSearch.Item = Item

export default LiveSearch