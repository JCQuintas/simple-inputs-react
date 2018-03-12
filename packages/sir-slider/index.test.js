import React from 'react'
import { shallow } from 'enzyme'
import Component from './index.js'

describe('Slider', () => {
  const wrapper = shallow(<Component />)
  it('should render', () => expect(wrapper.exists(<div className="c0">SIR-Slider</div>)).toBe(true))
})
