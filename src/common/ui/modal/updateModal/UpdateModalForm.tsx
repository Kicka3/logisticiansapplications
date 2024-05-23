import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ControlledTextField } from '@/common/ui/controlled/controlledtextField/controlledTextFiled'
import { AddFormValues, addFormSchema } from '@/common/ui/modal/utils/schema'
import { Typography } from '@/common/ui/typography'
import { Button, Modal, ThemeProvider } from '@gravity-ui/uikit'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {
  disabled?: boolean
  onSubmitApplication?: (data: AddFormValues) => void
  title?: string | undefined
}

export const AddModalForm = ({ onSubmitApplication, title }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AddFormValues>({
    defaultValues: {
      ATICode: '',
      CarrierContactNumber: '',
      CarriersFullName: '',
      applicationNumber: '',
      comment: '',
      companyName: '',
    },
    resolver: zodResolver(addFormSchema),
  })

  const [isOpen, setIsOpen] = useState(false)

  const onSubmit = (data: AddFormValues) => {
    setIsOpen(false)
    if (onSubmitApplication) {
      onSubmitApplication(data)
    }
    reset()
  }

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
    reset()
  }

  return (
    <>
      <Button onClick={handleOpenModal}>Create Modal</Button>
      <ThemeProvider>
        <Modal
          aria-label={'addNewApplication'}
          autoFocus
          contentOverflow={'visible'}
          onClose={handleCloseModal}
          open={isOpen}
        >
          <div>
            <Typography variant={'body1'}>{title}</Typography>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ControlledTextField
                  control={control}
                  errorMessage={errors.applicationNumber?.message}
                  label={'Номер завяки'}
                  name={'applicationNumber'}
                  type={'number'}
                  variant={'default'}
                />
                <ControlledTextField
                  control={control}
                  errorMessage={errors.date?.message}
                  label={'Дата получения заявки от клиента (дд.мм.гггг чч:мм)'}
                  name={'date'}
                  pattern={'\\d{2}\\.\\d{2}\\.\\d{4} \\d{2}:\\d{2}'}
                  variant={'default'}
                />
                <ControlledTextField
                  control={control}
                  errorMessage={errors.companyName?.message}
                  label={'Название фирмы клиента'}
                  name={'companyName'}
                  variant={'default'}
                />
                <ControlledTextField
                  control={control}
                  errorMessage={errors.CarriersFullName?.message}
                  label={'ФИО перевозчика'}
                  name={'CarriersFullName'}
                  variant={'default'}
                />
                <ControlledTextField
                  control={control}
                  // disabled={disabled}
                  errorMessage={errors.CarrierContactNumber?.message}
                  label={'Контактный телефон перевозчика'}
                  name={'CarrierContactNumber'}
                  type={'number'}
                  variant={'default'}
                />
                <ControlledTextField
                  control={control}
                  // disabled={disabled}
                  errorMessage={errors.comment?.message}
                  label={'Комментарии'}
                  name={'comment'}
                  variant={'default'}
                />
                <ControlledTextField
                  control={control}
                  errorMessage={errors.ATICode?.message}
                  label={'ATI код сети перевозчика'}
                  name={'ATICode'}
                  type={'number'}
                  variant={'default'}
                />
                <div>
                  <Button
                    onClick={handleCloseModal}
                    size={'l'}
                    type={'reset'}
                    view={'outlined-action'}
                  >
                    Отмена
                  </Button>
                  <Button size={'l'} type={'submit'} view={'outlined-action'}>
                    Отправить
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </ThemeProvider>
    </>
  )
}
