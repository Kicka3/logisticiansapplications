import React, { ChangeEvent, ComponentPropsWithoutRef, ElementType, useState } from 'react'

import Close from '@/assets/icons/Close'
import Search from '@/assets/icons/Search'
import { Typography } from '@/common/ui/typography'
import clsx from 'clsx'

import s from './textField.module.scss'

type VariantInput = 'default' | 'password' | 'search'

export type TextFieldProps<T extends ElementType = 'input'> = {
  errorMessage?: string
  label?: string
  onChange?: (value: string) => void
  variant?: VariantInput
} & Omit<ComponentPropsWithoutRef<T>, 'onChange'>

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props, forwardedRef) => {
    const {
      className,
      disabled = false,
      errorMessage = '',
      id,
      label,
      onChange,
      placeholder,
      variant = 'default',
      ...rest
    } = props

    const searchVariant = variant === 'search'

    const [inputType] = useState('text')
    const [inputValue, setInputValue] = useState('')
    const isShowClearButton = searchVariant && inputValue && !errorMessage

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value)
      onChange && onChange(e.currentTarget.value)
    }

    const clearValue = () => {
      setInputValue('')
      onChange && onChange('')
    }

    const inputID = id ?? crypto.randomUUID()

    const classNames = {
      buttonIcon: s.buttonIcon,
      container: s.container,
      errorMessage: s.errorMessage,
      eyeIcon: clsx(s.eyeIcon, errorMessage && s.eyeIconError),
      iconSearch: clsx(
        s.iconSearch,
        disabled && s.iconSearchDisabled,
        errorMessage && s.iconSearchError
      ),
      input: clsx(
        s.input,
        errorMessage && s.error,
        inputValue && s.inputActive,
        errorMessage && s.inputActiveError
      ),
      inputContainer: clsx(s.textFieldContainer, s[variant]),
      textFieldContainer: clsx(s.container, className),
      textFieldLabel: clsx(s.label, disabled && s.label_disabled),
    }

    return (
      <div className={classNames.container}>
        <div className={classNames.inputContainer}>
          {searchVariant ? (
            <Typography
              as={'label'}
              className={classNames.iconSearch}
              htmlFor={inputID}
              variant={'body2'}
            >
              <Search height={'20px'} width={'20px'} />
            </Typography>
          ) : (
            <Typography as={'label'} className={classNames.textFieldLabel} variant={'body2'}>
              {label}
            </Typography>
          )}

          <input
            className={classNames.input}
            id={inputID}
            {...rest}
            disabled={disabled}
            name={'controlledTextField'}
            onChange={onChangeValue}
            placeholder={placeholder}
            ref={forwardedRef}
            type={inputType}
          />
          {isShowClearButton && (
            <button className={classNames.buttonIcon} onClick={clearValue}>
              <Close height={'18px'} width={'18px'} />
            </button>
          )}
        </div>
        {errorMessage && (
          <Typography className={classNames.errorMessage} variant={'caption'}>
            {errorMessage}
          </Typography>
        )}
      </div>
    )
  }
)
