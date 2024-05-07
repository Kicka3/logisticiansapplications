import React from 'react'

import { ButtonProps } from '@gravity-ui/uikit'

interface ActionsButtonProps extends ButtonProps {
  items: {
    name: string
    onClick: () => void
  }[]
}

const ActionsButton: React.FC<ActionsButtonProps> = ({ items, ...restProps }) => {
  return (
    <button {...restProps}>
      {items.map((item, index) => (
        <span key={index} onClick={item.onClick}>
          {item.name}
        </span>
      ))}
    </button>
  )
}

export default ActionsButton
