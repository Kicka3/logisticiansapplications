import { Dispatch, SetStateAction } from 'react'

import { ModeForm, Status } from '@/common/enums/enums'
import { ModalForm } from '@/common/ui/modal/addModal'
import { AddFormValues } from '@/common/ui/modal/utils/schema'
import { useCreateApplicationMutation } from '@/servies/applications/applications.service'
import { Application } from '@/servies/types'
import { generateId } from '@/servies/utils/generateId'

type Props = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  setTypeForm: Dispatch<SetStateAction<ModeForm>>
  typeForm: ModeForm
}

export const CreateApplication = ({ isOpen, setIsOpen, setTypeForm, typeForm }: Props) => {
  const [createApplication] = useCreateApplicationMutation()

  const onSubmitApplication = (data: AddFormValues) => {
    const application: Application = {
      applicationNumber: data.applicationNumber,
      atiCode: data.ATICode,
      carrierFullName: data.CarriersFullName,
      carrierPhone: data.CarrierContactNumber,
      clientCompanyName: data.companyName,
      comment: data.comment,
      date: data.date,
      id: generateId(),
      status: Status.NEW,
    }

    createApplication(application)
  }

  return (
    <ModalForm
      isOpen={isOpen}
      onSubmitApplication={onSubmitApplication}
      setIsOpen={setIsOpen}
      setTypeForm={setTypeForm}
      typeForm={typeForm}
    />
  )
}
