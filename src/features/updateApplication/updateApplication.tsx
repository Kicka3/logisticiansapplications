import { Dispatch, SetStateAction } from 'react'

import { ModeForm } from '@/common/enums/enums'
import { ModalForm } from '@/common/ui/modal/addModal'
import { AddFormValues } from '@/common/ui/modal/utils/schema'
import { useUpdateApplicationMutation } from '@/servies/applications/applications.service'
import { Application } from '@/servies/types'
import { STATUS_NEW } from '@/servies/utils/constants'

type Props = {
  id: string | undefined
  initialValues?: AddFormValues | undefined
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  setOpenEditeForm?: (value: boolean) => void
  setTypeForm?: Dispatch<SetStateAction<ModeForm>>
  typeForm: ModeForm
}

export const UpdateApplication = ({
  id,
  initialValues,
  isOpen,
  setIsOpen,
  setTypeForm,
  typeForm,
}: Props) => {
  const [updateApplication] = useUpdateApplicationMutation()

  const onUpdateApplication = async (data: AddFormValues) => {
    let applicationStatus: string

    if (typeForm === ModeForm.UPDATE) {
      applicationStatus = data.statusApp
    } else {
      applicationStatus = STATUS_NEW
    }

    const application: Application = {
      applicationNumber: data.applicationNumber,
      atiCode: data.ATICode,
      carrierFullName: data.CarriersFullName,
      carrierPhone: data.CarrierContactNumber,
      clientCompanyName: data.companyName,
      comment: data.comment,
      date: data.date,
      status: applicationStatus,
    }

    try {
      await updateApplication({ id, ...application }).unwrap()
      setIsOpen(false)
    } catch (err) {
      console.error('Ошибка при обновлении заявки:', err)
    }

    updateApplication(application)
  }

  return (
    <ModalForm
      initialValues={initialValues}
      isOpen={isOpen}
      onUpdateApplication={onUpdateApplication}
      setIsOpen={setIsOpen}
      setTypeForm={setTypeForm}
      typeForm={typeForm}
    />
  )
}
