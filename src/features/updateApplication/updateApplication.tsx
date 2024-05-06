import { Dispatch, SetStateAction } from 'react'

import { ModeForm, Status } from '@/common/enums/enums'
import { AddModalForm } from '@/common/ui/modal/addModal'
import { AddFormValues } from '@/common/ui/modal/utils/schema'
import { useUpdateApplicationMutation } from '@/servies/applications/applications.service'
import { Application } from '@/servies/types'

type Props = {
  id: string | undefined
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  setOpenEditeForm?: (value: boolean) => void
  setTypeForm: Dispatch<SetStateAction<ModeForm>>
  typeForm: ModeForm
}

export const UpdateApplication = ({
  id,
  isOpen,
  setIsOpen,
  setOpenEditeForm,
  setTypeForm,
  typeForm,
}: Props) => {
  const [updateApplication] = useUpdateApplicationMutation()

  const onUpdateApplication = async (data: AddFormValues) => {
    const application: Application = {
      atiCode: data.ATICode,
      carrierFullName: data.CarriersFullName,
      carrierPhone: data.CarrierContactNumber,
      clientCompanyName: data.companyName,
      comment: data.comment,
      date: data.date,
      status: Status.NEW,
    }

    try {
      // Проверяем, есть ли новый статус в полях ввода
      // const newStatus = data.statusApp
      // let updatedStatus = Status.NEW // По умолчанию используем статус 'Новая'
      //
      // // Проверяем, является ли новый статус допустимым значением из enum Status
      // if (Object.values(Status).includes(newStatus)) {
      //   updatedStatus = newStatus
      // }
      //
      // // Обновляем статус в объекте updateData перед отправкой запроса
      // updateData.status = updatedStatus

      await updateApplication({ id, ...application }).unwrap()
      setOpenEditeForm && setOpenEditeForm(false)
    } catch (err) {
      console.error('Ошибка при обновлении заявки:', err)
    }

    updateApplication(application)
  }

  return (
    <AddModalForm
      isOpen={isOpen}
      onUpdateApplication={onUpdateApplication}
      setIsOpen={setIsOpen}
      setTypeForm={setTypeForm}
      typeForm={typeForm}
    />
  )
}
