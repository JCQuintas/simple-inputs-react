import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Loader from './loaders'

const loaderKeys = Object.keys(Loader)

class Loading extends PureComponent {
  render() {
    const { type, ...props } = this.props
    const Load = Loader[type]
    if (Load) return <Load {...props} />
    const DefaultLoader = Loader['menu']
    return <DefaultLoader {...props} />
  }
}

Loading.displayName = 'SIR-Loading'

Loading.defaultProps = {
  type: 'menu',
  children: 'Loading...',
}

Loading.propTypes = {
  type: PropTypes.oneOf(loaderKeys),
}

export default Loading
