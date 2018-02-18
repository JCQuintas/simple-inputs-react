import React from 'react'
import { shallow } from 'enzyme'
import Component from './index.js'

describe('Loading', () => {
  const wrapper = shallow(<Component />)
  it('should render', () => expect(wrapper.exists(<div className="c0">SIR-Loading</div>)).toBe(true))
})
