import React from 'react'
import { shallow } from 'enzyme'
import Component from './index.js'

describe('COMPONENT_NAME', () => {
  const wrapper = shallow(<Component />)
  it('should render', () => expect(wrapper.exists(<div className="c0">SIR-COMPONENT_NAME</div>)).toBe(true))
})
