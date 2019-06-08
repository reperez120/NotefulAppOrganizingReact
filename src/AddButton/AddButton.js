import React from 'react'
import './AddButton.css'

export default function NavAddButton(props) {
  const { tag, className, childrenm, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['NavAddButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

NavAddButton.defaultProps ={
  tag: 'a',
}
