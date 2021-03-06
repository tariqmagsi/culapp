import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LiveSearch from './LiveSearch'
import { FormControl } from 'react-bootstrap'

export default class ReactLiveSearch extends Component {
  static propTypes = {
    value: PropTypes.string,
    data: PropTypes.array,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    itemStyle: PropTypes.object,
    icon: PropTypes.string
  }

  static defaultProps = {
    itemStyle: {},
    onChange: () => {}
  }

  state = {
    selected: false,
    cursor: 0
  }

  handleValueChange = value => {
    const { onChange } = this.props

    onChange(value)
    this.setState({ selected: false })
  }

  handleItemSelect = value => {
    const { data, onSelect } = this.props
    const selected = true
    this.handleValueChange(data.find(item => item.value === value)['value'])
    this.setState({ selected })
    onSelect(selected)
  }

  handleKeyDown = e => {
    const { cursor } = this.state
    const { length } = this.filteredData

    switch (e.key) {
      case 'ArrowDown':
        this.setState({
          cursor: cursor < length - 1 ? cursor + 1 : 0
        })
        break
      case 'ArrowUp':
        this.setState({
          cursor: cursor > 0 ? cursor - 1 : length - 1
        })
        break
      case 'Enter':
        this.handleItemSelect(this.filteredData[cursor].value)
        this.setState({ cursor: 0 })
        break
      default:
        console.log("none")
    }
  }

  render() {
    const { value, data, itemStyle } = this.props
    const { selected, cursor } = this.state

    this.filteredData = data.filter(item => item.label)

    return (
      <LiveSearch>
        <div>
          <FormControl
            type='text'
            size="sm"
            value={value}
            placeholder="Search"
            onChange={e => this.handleValueChange(e.target.value)}
            onKeyDown={this.handleKeyDown}
          />
        </div>
        {!!value && !!this.filteredData.length && !selected && (
          <LiveSearch.Items>
            {this.filteredData.map((item, index) => (
              <LiveSearch.Item
                key={item.value}
                style={itemStyle}
                onClick={() => this.handleItemSelect(item.value)}
                active={cursor === index}
              >
                {item.label}
              </LiveSearch.Item>
            ))}
          </LiveSearch.Items>
        )}
      </LiveSearch>
    )
  }
}