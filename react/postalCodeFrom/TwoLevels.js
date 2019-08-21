import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from '../propTypes/AddressShapeWithValidation'
import SelectLevel from './SelectLevel'
import SelectPostalCode from './SelectPostalCode'
import SubmitButton from './SubmitButton'

class TwoLevels extends Component {
  render() {
    const {
      address,
      rules,
      Input,
      onChangeAddress,
      onSubmit,
      submitLabel,
      Button,
    } = this.props

    if (Button && onSubmit) {
      return (
        <form className="vtex-address-form__twoLevels" onSubmit={onSubmit}>
          <SelectLevel
            level={0}
            Input={Input}
            rules={rules}
            address={address}
            onChangeAddress={onChangeAddress}
          />
          <SelectPostalCode
            Input={Input}
            rules={rules}
            address={address}
            onChangeAddress={onChangeAddress}
          />
          <SubmitButton Button={Button} buttonLabel={submitLabel} />
        </form>
      )
    }

    return (
      <div>
        <SelectLevel
          level={0}
          Input={Input}
          rules={rules}
          address={address}
          onChangeAddress={onChangeAddress}
        />
        <SelectPostalCode
          Input={Input}
          rules={rules}
          address={address}
          onChangeAddress={onChangeAddress}
        />
      </div>
    )
  }
}

TwoLevels.propTypes = {
  address: AddressShapeWithValidation,
  Button: PropTypes.func,
  Input: PropTypes.func.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  rules: PropTypes.object.isRequired,
  submitLabel: PropTypes.string,
}

export default TwoLevels
