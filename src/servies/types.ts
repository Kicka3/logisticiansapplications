import { Status } from '@/common/enums/enums'

export type Application = {
  applicationNumber: string
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
