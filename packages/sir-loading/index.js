import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Loader from './loaders'

class Loading extends PureComponent {
  render() {
    const { type } = this.props
    const Load = Loader[type]
    return <Load {...this.props} />
  }
}

Loading.displayName = 'SIR-Loading'

Loading.defaultProps = {
  type: 'menu',
  children: 'Loading...',
}

Loading.propTypes = {
  type: PropTypes.oneOf(['menu', 'hamburger', 'dot-spinner']),
}

export default Loading
