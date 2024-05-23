export type AppStatus = 'В работе' | 'Завершено' | 'Новая'

export type Application = {
  applicationNumber: string
  atiCode: string
  carrierFullName: string
  carrierPhone: string
  clientCompanyName: string
  comment: string
  date: string
  id?: string
  status: string
}

export type ApplicationsResponse = Application[]

export type GetAppArgs = {
  atiCode?: string
  carrierFullName?: string
  clientCompanyName?: string
  id?: string
  status?: AppStatus
}

export type IdAppRequest = {
  id: string
}
