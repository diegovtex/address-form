import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import AddressSummary from './AddressSummary'
import address from './__mocks__/addressWithoutValidation'
import usePostalCode from './country/__mocks__/usePostalCode'
import displayBrazil from './country/__mocks__/displayBrazil'
import displayUSA from './country/__mocks__/displayUSA'

describe('AddressSummary', () => {
  it('renders without crashing', () => {
    const wrapper = mount(
      <AddressSummary address={address} rules={displayBrazil} />,
    )
    expect(wrapper.find('div')).toHaveLength(1)
  })

  it('should render each field in its own span', () => {
    const wrapper = mount(
      <AddressSummary
        address={{
          ...address,
          street: '1 Hacker Way',
          complement: '2nd floor',
          city: 'Menlo Park',
          state: 'CA',
          country: 'USA',
        }}
        rules={displayUSA}
      />,
    )

    expect(wrapper.find('.street')).toHaveText('1 Hacker Way')
    expect(wrapper.find('.complement')).toHaveText('2nd floor')
    expect(wrapper.find('.city')).toHaveText('Menlo Park')
    expect(wrapper.find('.state')).toHaveText('CA')
  })

  it('should not render spans for empty fields', () => {
    const wrapper = mount(
      <AddressSummary
        address={{
          ...address,
          street: '1 Hacker Way',
          complement: null,
          city: 'Menlo Park',
          state: 'CA',
          country: 'USA',
        }}
        rules={displayUSA}
      />,
    )

    expect(wrapper.find('.complement')).toHaveLength(0)
  })

  it('should render child component', () => {
    function MyChild() {
      return <div />
    }

    const wrapper = mount(
      <AddressSummary address={address} rules={displayBrazil}>
        <MyChild />
      </AddressSummary>,
    )

    expect(wrapper.find('MyChild')).toHaveLength(1)
  })

  it('should call click handler', () => {
    const handleClick = jest.fn()

    const wrapper = mount(
      <AddressSummary
        address={address}
        rules={displayBrazil}
        canEditData={false}
        onClickMaskedInfoIcon={handleClick}
      />,
    )

    const maskedInfoIcon = wrapper.find('.client-masked-info')
    maskedInfoIcon.simulate('click', { preventDefault() {} })

    expect(handleClick).toHaveBeenCalled()
  })

  it('should render gift list address', () => {
    const tree = renderer.create(
      <AddressSummary
        giftRegistryDescription={'João da Silva'}
        address={address}
        rules={usePostalCode}
      />,
    )

    expect(tree).toMatchSnapshot()
  })

  it('should format address according to rules', () => {
    const brazilianAddress = renderer.create(
      <AddressSummary
        address={{
          ...address,
          street: 'Av. Praia de Botafogo',
          number: '300',
          complement: 'ap. 322',
          neighborhood: 'Botafogo',
          city: 'Rio de Janeiro',
          state: 'RJ',
          country: 'BRA',
        }}
        rules={displayBrazil}
      />,
    )

    const americanAddress = renderer.create(
      <AddressSummary
        address={{
          ...address,
          street: '1 Infinite Loop',
          number: null,
          complement: 'Suite 306',
          neighborhood: null,
          city: 'Cupertino',
          state: 'CA',
          country: 'USA',
        }}
        rules={displayUSA}
      />,
    )

    expect(brazilianAddress).toMatchSnapshot()
    expect(americanAddress).toMatchSnapshot()
  })
})
