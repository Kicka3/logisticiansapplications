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
import { DeleteTitleAppModalForm } from '@/servies/utils/constants'
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

  //Избавиться
  // const [isAdmin, setIsAdmin] = useState(false)
  const isAdmin = useSelector(selectIsAdmin)
  const dispatch = useDispatch()

  const { data: applications, isLoading } = useGetApplicationsQuery()
  const [deleteApplication] = useDeleteApplicationMutation()

  const navigate = useNavigate()

  const handleOpen = (id: string) => {
    navigate(`/application/${id}`)
  }

  /** Counter */
  const applicationsArr = Array.isArray(applications) ? applications : [applications]
  const applicationCount = applicationsArr?.length || 0

  const columns: TableColumnConfig<TableDataItem>[] = [
    {
      id: 'id',
      name: 'ID заявки',
    },

    {
      id: 'date',
      name: 'Дата и время получения заявки от клиента',
    },
    {
      id: 'status',
      name: 'Статус заявки',
    },
    {
      id: 'applicationNumber',
      name: 'Номер заявки',
    },
    {
      id: 'clientCompanyName',
      name: 'Название фирмы клиента',
    },
    {
      id: 'carrierFullName',
      name: 'ФИО перевозчика',
    },
    {
      id: 'carrierPhone',
      name: 'Контактный телефон перевозчика',
    },
    {
      id: 'comment',
      name: 'Комментарии',
    },
    {
      id: 'atiCode',
      name: 'ATI код сети перевозчика',
      template: getApplications => (
        <a
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

  return (
    <div>
      <div className={s.applicationsCount}>
        Количество заявок: {applicationCount}
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
      <MyTable
        className={s.tableWitchPadding}
        columns={columns}
        data={applications}
        getRowActions={getRowActions}
        // getRowId={getRowId}
        //Это для чекбоксов
        // onSelectionChange={setSelectedIds}
        rowActionsSize={'m'}
        // selectedIds={selectedIds}
        verticalAlign={'top'}
        // wordWrap
      />

      <DeleteModalForm
        isDeleteModalOpen={isDeleteModalOpen}
        onDeleteApplication={onDeleteApplication}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        title={DeleteTitleAppModalForm}
      />
      <button onClick={toggleModeHandler} style={{ backgroundColor: 'transparent' }}>
        {!isAdmin ? 'Switch to admin mode' : 'Switch to normal mode'}
      </button>
    </div>
  )
}
