import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

import { ModeForm } from '@/common/enums/enums'
import { ControlledTextField } from '@/common/ui/controlled/controlledtextField/controlledTextFiled'
import { AddFormValues, addFormSchema } from '@/common/ui/modal/utils/schema'
import { Typography } from '@/common/ui/typography'
import { AddTitleAppModalForm, UpdateTitleAppModalForm } from '@/servies/utils/constant'
import { Button, Modal, ThemeProvider } from '@gravity-ui/uikit'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './addModalForm.module.scss'

type Props = {
  initialValues?: AddFormValues | undefined
  isOpen: boolean
  onSubmitApplication?: (data: AddFormValues) => void
  onUpdateApplication?: (data: AddFormValues) => void
  setIsOpen: (value: boolean) => void
  setTypeForm?: Dispatch<SetStateAction<ModeForm>>
  typeForm: ModeForm
}

export const ModalForm = ({
  initialValues,
  isOpen,
  onSubmitApplication,
  onUpdateApplication,
  setIsOpen,
  setTypeForm,
  typeForm,
}: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AddFormValues>({
    defaultValues: initialValues,
    resolver: zodResolver(addFormSchema),
  })

  const onSubmit = (data: AddFormValues) => {
    setIsOpen(false)
    setTypeForm && setTypeForm(ModeForm.ADD)

    if (onSubmitApplication && typeForm !== ModeForm.UPDATE) {
      onSubmitApplication(data)
    } else if (onUpdateApplication && typeForm === ModeForm.UPDATE) {
      onUpdateApplication(data)
    }

    reset()
  }

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setTypeForm && setTypeForm(ModeForm.ADD)
    setIsOpen(false)
    reset()
  }

  const title = typeForm === 'add' ? AddTitleAppModalForm : UpdateTitleAppModalForm
  const buttonText = typeForm === 'add' ? 'Добавить' : 'Сохранить изменения'

  return (
    <>
      <Button
        className={s.createAppBtn}
        onClick={handleOpenModal}
        size={'l'}
        view={'outlined-action'}
      >
        Создать заявку
      </Button>
      <ThemeProvider>
        <Modal
          aria-label={'addNewApplication'}
          autoFocus
          className={s.modal}
          contentOverflow={'visible'}
          onClose={handleCloseModal}
          open={isOpen}
        >
          <div className={s.contentWrapper}>
            <Typography className={s.modalTitle} variant={'body1'}>
              {title}
            </Typography>
            <div className={s.modalContent}>
              <form className={s.modalForm} onSubmit={handleSubmit(onSubmit)}>
                <ControlledTextField
                  control={control}
                  // defaultValue={initialValues?.applicationNumber}
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
                  pattern={'\\d{2}\\.\\d{2}\\.\\d{4}(,|\\s)\\d{2}:\\d{2}'} // Паттерн для валидации ввода
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
                  errorMessage={errors.CarrierContactNumber?.message}
                  label={'Контактный телефон перевозчика'}
                  name={'CarrierContactNumber'}
                  type={'number'}
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
                {/*{typeForm === 'upd' && (*/}
                {/*  <ControlledTextField*/}
                {/*    control={control}*/}
                {/*    defaultValue={initialValues?.comment}*/}
                {/*    errorMessage={errors.statusApp?.message}*/}
                {/*    label={`Статус заявки: '${Status.NEW}', '${Status.IN_PROGRESS}', '${Status.COMPLETED}','`}*/}
                {/*    name={'statusApp'}*/}
                {/*    variant={'default'}*/}
                {/*  />*/}
                {/*)}*/}
                <ControlledTextField
                  control={control}
                  errorMessage={errors.comment?.message}
                  label={'Комментарии'}
                  name={'comment'}
                  variant={'default'}
                />
                <div className={s.btnGroup}>
                  <Button
                    className={s.modalBtn}
                    onClick={handleCloseModal}
                    size={'l'}
                    type={'reset'}
                    view={'outlined-action'}
                  >
                    Отмена
                  </Button>
                  <Button
                    className={s.modalBtn}
                    size={'l'}
                    type={'submit'}
                    view={'outlined-action'}
                  >
                    {buttonText}
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
