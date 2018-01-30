import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import Pager from './Pager'

class ViewPager extends Component {
  static childContextTypes = {
    pager: PropTypes.instanceOf(Pager)
  }

  static propTypes = {
    tag: PropTypes.string
  }

  static defaultProps = {
    tag: 'div'
  }

  constructor(props) {
    super(props)

    this._pager = new Pager()
  }

  getChildContext() {
    return {
      pager: this._pager
    }
  }

  componentDidMount() {
    const forceUpdate = () => this.forceUpdate()

    // run a hydration on the next animation frame to obtain proper targets and positioning
    requestAnimationFrame(() => {
      this._pager.hydrate()

      // re-render the whole tree to update components on certain events
      this._pager.on('viewChange', forceUpdate)
      this._pager.on('hydrated', forceUpdate)
    })

    this.off = () => {
      this._pager.off('viewChange', forceUpdate)
      this._pager.off('hydrated', forceUpdate)
    }
  }

  componentWillUnmount () {
    this.off && this.off()
  }

  getInstance() {
    return this._pager
  }

  render() {
    const { tag, ...restProps } = this.props
    return createElement(tag, restProps)
  }
}

export default ViewPager
