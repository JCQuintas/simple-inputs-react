import React from 'react'
import { shallow } from 'enzyme'
import Component from '.'

describe('Search', () => {
  const wrapper = shallow(<Component />)
  it('should render', () => expect(wrapper.exists(<div className="c0">SIR-Search</div>)).toBe(true))
})
