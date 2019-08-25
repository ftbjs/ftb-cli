import React from 'react'
import { shallow } from 'enzyme'
import Clock from '../components/Clock'

describe('<Clock />', () => {
  it('shodle render right label', () => {
    const wrapper = shallow(<Clock />)
    expect(wrapper.find('button').type()).toBe('button')
  })
})
