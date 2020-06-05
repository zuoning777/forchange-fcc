import React from 'react'
import { withRouter } from 'react-router-dom'

const Template = withRouter(React.lazy(() => import('./pages/Template')))

export default [
  {
    name: '',
    path: '',
    component: () => <Template/>
  }
]
