import * as React from 'react'
import { mount, shallow } from 'enzyme'
import FormCheck from 'react-bootstrap/FormCheck'
import * as sinon from 'sinon'
import { Checkbox } from '../dist'

describe('Checkbox', () => {
  it('Checkbox renders itself without crashing', () => {
    const checkboxWrapper = shallow(<Checkbox label="Checkbox" />)
    expect(checkboxWrapper.text()).toEqual('Checkbox')
    expect(checkboxWrapper.props().disabled).toBeFalsy()
    expect(checkboxWrapper.props().inline).toBeFalsy()
    expect(checkboxWrapper.props().name).toBeUndefined()
    expect(checkboxWrapper.props().onChange).toBeUndefined()
    expect(checkboxWrapper.find(FormCheck)).toHaveLength(1)
  })

  it('Checkbox renders the label on the right hand side by default', () => {
    const checkboxWrapperRight = shallow(<Checkbox label="Checkbox" labelSide="right" />)
    expect(checkboxWrapperRight.text()).toEqual('Checkbox')
    expect(checkboxWrapperRight.childAt(1).type()).toBe(FormCheck.Label)
  })

  it('Checkbox should allow for the use of a name', () => {
    const checkboxWrapper = shallow(<Checkbox label="Checkbox" name="test" />)
    const bootstrapCheckBox = checkboxWrapper.find(FormCheck)
    expect(bootstrapCheckBox.props().name).toEqual('test')
  })

  it('Checkbox should render inline if the inline prop is used', () => {
    const checkboxWrapper = shallow(<Checkbox label="Checkbox" inline />)
    const bootstrapCheckBox = checkboxWrapper.find(FormCheck)
    expect(bootstrapCheckBox.props().inline).toBeTruthy()
  })

  it('Checkbox renders the label on the correct side', () => {
    const checkboxWrapperLeft = shallow(<Checkbox label="Checkbox" labelSide="left" />)
    expect(checkboxWrapperLeft.text()).toEqual('Checkbox')
    expect(checkboxWrapperLeft.childAt(0).type()).toBe(FormCheck.Label)

    const checkboxWrapperRight = shallow(<Checkbox label="Checkbox" labelSide="right" />)
    expect(checkboxWrapperRight.text()).toEqual('Checkbox')
    expect(checkboxWrapperRight.childAt(1).type()).toBe(FormCheck.Label)
  })

  it('Checkbox should render be rendered disabled when disabled prop is used', () => {
    const wrapper = mount(<Checkbox label="Checkbox" disabled />)
    const input = wrapper.find(HTMLInputElement)
    expect(input.prop('disabled')).toBe(true)
  })

  it('Checkbox handle the change event', () => {
    const onChange = sinon.spy()
    const wrapper = mount(<Checkbox label="Checkbox" onChange={onChange} />)
    const input = wrapper.find(HTMLInputElement)
    input.simulate('change')
    expect(onChange).toHaveProperty('callCount', 1)
  })
})
