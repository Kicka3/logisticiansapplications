import { Status } from '@/common/enums/enums'

export type Application = {
  atiCode: string
  carrierFullName: string
  carrierPhone: string
  clientCompanyName: string
  comment: string
  date: string
  id?: string
  status: Status
}

export type ApplicationsResponse = Application[]

export type GetAppArgs = {
  atiCode?: string
  carrierFullName?: string
  clientCompanyName?: string
  id?: string
  status?: Status
}

export type IdAppRequest = {
  id: string
}

export type MyAddFormValues = {
  ATICode: string
  CarrierContactNumber: string
  CarriersFullName: string
  applicationNumber: string
  comment: string
  companyName: string
  date: string
  id?: string | undefined // Добавляем id как опциональное свойство
  statusApp: string
}
