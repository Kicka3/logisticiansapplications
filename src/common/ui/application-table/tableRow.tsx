import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ModeForm } from '@/common/enums/enums'
import { DeleteModalForm } from '@/common/ui/modal/deleteModal'
import { CreateApplication } from '@/features/createApplication'
import { UpdateApplication } from '@/features/updateApplication'
import {
  useDeleteApplicationMutation,
  useGetApplicationsQuery,
} from '@/servies/applications/applications.service'
import { selectIsAdmin } from '@/servies/auth-reducer/authSelector'
import { setIsAdmin } from '@/servies/auth-reducer/authSlice'
import {
  Table,
  TableActionConfig,
  TableColumnConfig,
  TableDataItem,
  withTableActions,
} from '@gravity-ui/uikit'

import s from './tableRow.module.scss'

const MyTable = withTableActions(Table)

export const TableRow: React.FC = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string>('')
  const [typeForm, setTypeForm] = useState(ModeForm.ADD)
  const [searchText, setSearchText] = useState('')

  const isAdmin = useSelector(selectIsAdmin)
  const dispatch = useDispatch()

  const { data: applications, isLoading } = useGetApplicationsQuery()
  const [deleteApplication] = useDeleteApplicationMutation()

  const navigate = useNavigate()

  const handleOpen = (id: string) => {
    navigate(`/application/${id}`)
  }

  /** Функция для фильтрации данных */
  const filteredApplications = Array.isArray(applications)
    ? applications.filter(application =>
        Object.values(application).some(val =>
          String(val).toLowerCase().includes(searchText.toLowerCase())
        )
      )
    : []

  const handleSearchChange = (event: any) => {
    setSearchText(event.target.value)
  }

  /** Counter */
  const applicationsArr = Array.isArray(applications) ? applications : [applications]
  const applicationCount = applicationsArr?.length || 0

  const columns: TableColumnConfig<TableDataItem>[] = [
    {
      className: s.topRow,
      id: 'id',
      name: 'ID заявки',
    },

    {
      className: s.topRow,
      id: 'date',
      name: 'Дата и время получения заявки от клиента',
    },
    {
      className: s.topRow,
      id: 'status',
      name: 'Статус заявки',
    },
    {
      className: s.topRow,
      id: 'applicationNumber',
      name: 'Номер заявки',
    },
    {
      className: s.topRow,
      id: 'clientCompanyName',
      name: 'Название фирмы клиента',
    },
    {
      className: s.topRow,
      id: 'carrierFullName',
      name: 'ФИО перевозчика',
    },
    {
      className: s.topRow,
      id: 'carrierPhone',
      name: 'Контактный телефон перевозчика',
    },
    {
      className: s.topRow,
      id: 'comment',
      name: 'Комментарии',
    },
    {
      id: 'atiCode',
      name: 'ATI код сети перевозчика',
      template: getApplications => (
        <a
          className={s.ATILink}
          href={`https://ati.su/firms/${getApplications?.atiCode}/info`}
          rel={'noopener noreferrer'}
          target={'_blank'}
        >
          {getApplications?.atiCode}
        </a>
      ),
    },
  ]

  const getRowActions = (item: TableDataItem): TableActionConfig<TableDataItem>[] => {
    const actions = [
      {
        handler: () => {
          setSelectedId(item.id as string)
          handleOpen(item?.id)
        },
        text: 'Посмотреть',
      },
    ]

    if (isAdmin) {
      actions.push({
        handler: () => {
          setIsDeleteModalOpen(true)
          setSelectedId(item.id as string)
        },
        text: 'Удалить',
      })
    }

    return actions
  }

  const onDeleteApplication = () => {
    deleteApplication({ id: selectedId })
  }

  const toggleModeHandler = () => {
    dispatch(setIsAdmin(!isAdmin))
  }

  if (isLoading) {
    return (
      <h1 style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
        LOADING...
      </h1>
    )
  }

  const getRowClassNames = (item: TableDataItem, rowIndex: number): string[] => {
    if (rowIndex % 2 === 0) {
      return [s.oddColumn]
    }

    if (item.actions) {
      return [s.actionCell]
    }

    return []
  }

  return (
    <div className={s.container}>
      <div className={s.contentWrapper}>
        <div className={s.tableHeader}>
          Количество заявок: {applicationCount}
          <div>
            <input
              className={s.searchInput}
              onChange={handleSearchChange}
              placeholder={'Поиск'}
              type={'text'}
              value={searchText}
            />
          </div>
          <div className={s.addApplication}>
            {typeForm === 'add' ? (
              isAdmin && (
                <CreateApplication
                  isOpen={isEditModalOpen}
                  setIsOpen={setIsEditModalOpen}
                  setTypeForm={setTypeForm}
                  typeForm={typeForm}
                />
              )
            ) : (
              <UpdateApplication
                id={selectedId}
                isOpen={isEditModalOpen}
                setIsOpen={setIsEditModalOpen}
                setTypeForm={setTypeForm}
                typeForm={ModeForm.UPDATE}
              />
            )}
          </div>
        </div>

        <MyTable
          className={s.tableMAIN}
          columns={columns}
          data={filteredApplications}
          getRowActions={getRowActions}
          getRowClassNames={getRowClassNames}
          rowActionsSize={'m'}
          verticalAlign={'top'}
        />

        <DeleteModalForm
          isDeleteModalOpen={isDeleteModalOpen}
          onDeleteApplication={onDeleteApplication}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
        <div>
          <button
            className={s.adminBtn}
            onClick={toggleModeHandler}
            style={{ backgroundColor: 'transparent' }}
          >
            {!isAdmin ? 'Switch to admin mode' : 'Switch to normal mode'}
          </button>
        </div>
      </div>
    </div>
  )
}
