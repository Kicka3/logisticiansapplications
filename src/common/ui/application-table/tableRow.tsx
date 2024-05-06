// import { useEffect, useMemo, useState } from 'react'
//
// import { ModeForm, Status } from '@/common/enums/enums'
// import { CheckboxAction } from '@/common/ui/checkbox/CheckboxAction'
// import { CreateApplication } from '@/features/createApplication'
// import { DeleteApplication } from '@/features/deleteApplication/deleteApplication'
// import {
//   useDeleteApplicationMutation,
//   useGetApplicationsQuery,
// } from '@/servies/applications/applications.service'
// import { Application } from '@/servies/types'
// import { DeleteTitleAppModalForm } from '@/servies/utils/constant'
// import { Table, TableColumnConfig } from '@gravity-ui/uikit'
//
// import s from './tableRow.module.scss'
//
// //Возможно полная хуйня
// const columns: TableColumnConfig<Application>[] = [
//   {
//     className: s.headPadding,
//     id: 'id',
//     name: 'ID заявки',
//   },
//   {
//     className: s.headPadding,
//     id: 'date',
//     name: 'Дата и время получения заявки от клиента',
//   },
//   {
//     className: s.headPadding,
//     id: 'clientCompanyName',
//     name: 'Название фирмы клиента',
//   },
//   {
//     className: s.headPadding,
//     id: 'carrierFullName',
//     name: 'ФИО перевозчика',
//   },
//   {
//     className: s.headPadding,
//     id: 'carrierPhone',
//     name: 'Контактный телефон перевозчика',
//   },
//   {
//     className: s.headPadding,
//     id: 'comment',
//     name: 'Комментарии',
//   },
//   {
//     className: s.headPadding,
//     id: 'status',
//     name: 'Статус заявки',
//   },
//   {
//     className: s.headPadding,
//     id: 'atiCode',
//     name: 'ATI код сети перевозчика',
//     template: getApplications => (
//       <a
//         href={`https://ati.su/firms/${getApplications?.atiCode}/info`}
//         rel={'noopener noreferrer'}
//         target={'_blank'}
//       >
//         {getApplications?.atiCode}
//       </a>
//     ),
//   },
// ]
//
// //Возможно полная хуйня
// const getRowClassNames = (item: Application) => {
//   const classes = [s.row]
//
//   if (item?.status === Status.NEW) {
//     classes.push(s.new)
//   } else if (item?.status === Status.IN_PROGRESS) {
//     classes.push(s.inProgress)
//   } else if (item?.status === Status.COMPLETED) {
//     classes.push(s.completed)
//   }
//
//   return classes
// }
//
// export const TableRow = () => {
//   const { data, isLoading } = useGetApplicationsQuery()
//   const [deleteApplication] = useDeleteApplicationMutation()
//
//   const [applicationCount, setApplicationCount] = useState(0)
//
//   const applicationCountMemo = useMemo(() => {
//     return data?.length || 0
//   }, [data])
//
//   useEffect(() => {
//     setApplicationCount(applicationCountMemo)
//   }, [applicationCountMemo])
//
//   const [typeForm, setTypeForm] = useState(ModeForm.ADD)
//
//   if (isLoading) {
//     return (
//       <h1 style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
//         LOADING...
//       </h1>
//     )
//   }
//
//   const toggleModeHandler = () => {
//     setTypeForm(typeForm === ModeForm.ADD ? ModeForm.UPDATE : ModeForm.ADD)
//   }
//
//   return (
//     <div className={s.applicationsTable}>
//       <div className={s.applicationsCount}>Количество заявок: {applicationCount}</div>
//       <Table
//         columns={columns}
//         data={data}
//         edgePadding
//         emptyMessage={'no data'}
//         getRowClassNames={getRowClassNames}
//         verticalAlign={'top'}
//         wordWrap
//       />
//       <CheckboxAction />
//       <CreateApplication
//         // title={AddTitleAppModalForm}
//         typeForm={typeForm}
//       />
//       <DeleteApplication title={DeleteTitleAppModalForm} />
//       <button onClick={toggleModeHandler} style={{ backgroundColor: 'transparent' }}>
//         {typeForm === ModeForm.ADD ? 'Switch to UPDATE mode' : 'Switch to ADD mode'}
//       </button>
//     </div>
//   )
//-----------------------------------------------------------------------

//TESTINGS1 with actions
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ModeForm } from '@/common/enums/enums'
import { DeleteModalForm } from '@/common/ui/modal/deleteModal'
import { CreateApplication } from '@/features/createApplication'
import { UpdateApplication } from '@/features/updateApplication'
import {
  useDeleteApplicationMutation,
  useGetApplicationsQuery,
} from '@/servies/applications/applications.service'
import { DeleteTitleAppModalForm } from '@/servies/utils/constant'
import {
  Table,
  TableActionConfig,
  TableColumnConfig,
  TableDataItem,
  withTableActions,
} from '@gravity-ui/uikit'

const MyTable = withTableActions(Table)

export const TableRow: React.FC = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string>('')
  const [typeForm, setTypeForm] = useState(ModeForm.ADD)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const { data, isLoading } = useGetApplicationsQuery()
  const [deleteApplication] = useDeleteApplicationMutation()

  const navigate = useNavigate()

  const handleOpen = (id: string) => {
    navigate(`/application/${id}`)
  }

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
      id: 'status',
      name: 'Статус заявки',
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
    return [
      {
        handler: () => {
          setSelectedId(item.id as string)
          handleOpen(item?.id)
        },
        text: 'Посмотреть',
      },
      {
        handler: () => {
          setSelectedId(item.id as string)
          setIsEditModalOpen(true)
          setTypeForm(ModeForm.UPDATE)
        },
        text: 'Изменить',
      },
      {
        handler: () => {
          setIsDeleteModalOpen(true)
          setSelectedId(item.id as string)
        },
        text: 'Удалить',
      },
    ]
  }

  const onDeleteApplication = () => {
    deleteApplication({ id: selectedId })
  }

  const toggleModeHandler = () => {
    setTypeForm(typeForm === ModeForm.ADD ? ModeForm.UPDATE : ModeForm.ADD)
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
      {typeForm === 'add' ? (
        <CreateApplication
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          setTypeForm={setTypeForm}
          typeForm={typeForm}
        />
      ) : (
        <UpdateApplication
          id={selectedId}
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          // setOpenEditeForm={setOpenEditeForm}
          setTypeForm={setTypeForm}
          typeForm={ModeForm.UPDATE}
        />
      )}
      <MyTable
        columns={columns}
        //TableDataItem[] Ошибка в типизации
        data={data}
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
        {typeForm === ModeForm.ADD ? 'Switch to admin mode' : 'Switch to normal mode'}
      </button>
    </div>
  )
}

//Просто с чекбоксами
// const MyTable = withTableSelection(Table)

//Какая-то хуйня с опциями
// const MyTable = withTableSettings(Table)

//Хуйня с сортировкой
// const MyTable = withTableSorting(Table)

// export const TableRowACt: React.FC = () => {
//   const data = [
//     {
//       atiCode: '12345',
//       carrierFullName: 'Иванов Иван Иванович',
//       carrierPhone: '+79998887766',
//       clientCompanyName: 'ООО Ромашка',
//       comment: 'Нужно перевезти груз из Москвы в Санкт-Петербург',
//       date: '02.04.2024, 10:37',
//       id: '1',
//       status: 'Новая',
//     },
//     {
//       atiCode: '67890',
//       carrierFullName: 'Петров Петр Петрович',
//       carrierPhone: '+79998887755',
//       clientCompanyName: 'ООО Львиная доля',
//       comment: 'Нужно перевезти груз из Казани в Екатеринбург',
//       date: '05.04.2024, 08:05',
//       id: '2',
//       status: 'В работе',
//     },
//     {
//       atiCode: '111213',
//       carrierFullName: 'Сидоров Сергей Сергеевич',
//       carrierPhone: '+79998887744',
//       clientCompanyName: 'ООО Солнечный ветер',
//       comment: 'Нужно перевезти груз из Краснодара в Ростов-на-Дону',
//       date: '08.04.2024, 11:11',
//       id: '3',
//       status: 'Завершено',
//     },
//   ]
//   const columns: TableColumnConfig<Application>[] = [
//     {
//       id: 'id',
//       meta: { defaultSortOrder: 'desc', sort: (a, b) => Date.parse(a.date) - Date.parse(b.date) },
//       name: 'ID заявки',
//     },
//     {
//       id: 'date',
//       name: 'Дата и время получения заявки от клиента',
//     },
//     {
//       id: 'clientCompanyName',
//       name: 'Название фирмы клиента',
//     },
//     {
//       id: 'carrierFullName',
//       name: 'ФИО перевозчика',
//     },
//     {
//       id: 'carrierPhone',
//       name: 'Контактный телефон перевозчика',
//     },
//     {
//       id: 'comment',
//       name: 'Комментарии',
//     },
//     {
//       id: 'status',
//       name: 'Статус заявки',
//     },
//     {
//       id: 'atiCode',
//       name: 'ATI код сети перевозчика',
//       template: getApplications => (
//         <a
//           href={`https://ati.su/firms/${getApplications?.atiCode}/info`}
//           rel={'noopener noreferrer'}
//           target={'_blank'}
//         >
//           {getApplications?.atiCode}
//         </a>
//       ),
//     },
//   ]
//
//   const getRowActions = (
//     item: TableDataItem,
//     index: number
//   ): TableActionConfig<TableDataItem>[] => {
//     return [
//       {
//         handler: () => {
//           console.log('ХУЙ')
//         },
//         text: 'Print',
//       },
//       {
//         handler: () => {},
//         text: 'Remove',
//       },
//     ]
//   }
//
//   //Для чекбоксов
//   // const getRowId = 'id'
//   // const [selectedIds, setSelectedIds] = useState([1])
//
//   return (
//     <MyTable
//       columns={columns}
//       data={data}
//       getRowActions={getRowActions}
//       // getRowId={getRowId}
//       //Это для чекбоксов
//       // onSelectionChange={setSelectedIds}
//       rowActionsSize={'m'}
//       // selectedIds={selectedIds}
//       verticalAlign={'top'}
//       wordWrap
//     />
//   )
// }

//TABLE WITCH SORT
// import { Table, withTableSorting } from '@gravity-ui/uikit'
//
// export const MyTableSort = () => {
//   const MyTable = withTableSorting(Table)
//
//   const data = [
//     { date: '2016-10-25', id: 1, text: 'Hello' },
//     { date: '2020-08-15', id: 2, text: 'World' },
//   ]
//   const columns = [
//     { id: 'id', meta: { sort: true } },
//     {
//       id: 'text',
//       meta: { defaultSortOrder: 'desc', sort: (a, b) => Date.parse(a.date) - Date.parse(b.date) },
//     },
//   ]
//
//   return <MyTable columns={columns} data={data} />
// }

//With ACTIONS
// import React, { useState } from 'react'
//
// import { Application } from '@/servies/types'
// import {
//   Table,
//   TableActionConfig,
//   TableColumnConfig,
//   TableDataItem,
//   withTableActions,
//   withTableSelection,
//   withTableSettings,
// } from '@gravity-ui/uikit'
//
// //Просто с Actions ...
// // const MyTable = withTableActions(Table)
//
// //Просто с чекбоксами
// // const MyTable = withTableSelection(Table)
//
// //Какая-то хуйня с опциями
// const MyTable = withTableSettings(Table)
//
// export const TableRowACt: React.FC = () => {
//   const data = [
//     {
//       atiCode: '12345',
//       carrierFullName: 'Иванов Иван Иванович',
//       carrierPhone: '+79998887766',
//       clientCompanyName: 'ООО Ромашка',
//       comment: 'Нужно перевезти груз из Москвы в Санкт-Петербург',
//       date: '02.04.2024, 10:37',
//       id: '123452',
//       status: 'Новая',
//     },
//     {
//       atiCode: '67890',
//       carrierFullName: 'Петров Петр Петрович',
//       carrierPhone: '+79998887755',
//       clientCompanyName: 'ООО Львиная доля',
//       comment: 'Нужно перевезти груз из Казани в Екатеринбург',
//       date: '05.04.2024, 08:05',
//       id: '213415',
//       status: 'В работе',
//     },
//     {
//       atiCode: '111213',
//       carrierFullName: 'Сидоров Сергей Сергеевич',
//       carrierPhone: '+79998887744',
//       clientCompanyName: 'ООО Солнечный ветер',
//       comment: 'Нужно перевезти груз из Краснодара в Ростов-на-Дону',
//       date: '08.04.2024, 11:11',
//       id: '213321',
//       status: 'Завершено',
//     },
//   ]
//   const columns: TableColumnConfig<Application>[] = [
//     {
//       id: 'id',
//       name: 'ID заявки',
//     },
//     {
//       id: 'date',
//       name: 'Дата и время получения заявки от клиента',
//     },
//     {
//       id: 'clientCompanyName',
//       name: 'Название фирмы клиента',
//     },
//     {
//       id: 'carrierFullName',
//       name: 'ФИО перевозчика',
//     },
//     {
//       id: 'carrierPhone',
//       name: 'Контактный телефон перевозчика',
//     },
//     {
//       id: 'comment',
//       name: 'Комментарии',
//     },
//     {
//       id: 'status',
//       name: 'Статус заявки',
//     },
//     {
//       id: 'atiCode',
//       name: 'ATI код сети перевозчика',
//       template: getApplications => (
//         <a
//           href={`https://ati.su/firms/${getApplications?.atiCode}/info`}
//           rel={'noopener noreferrer'}
//           target={'_blank'}
//         >
//           {getApplications?.atiCode}
//         </a>
//       ),
//     },
//   ]
//
//   const getRowActions = (
//     item: TableDataItem,
//     index: number
//   ): TableActionConfig<TableDataItem>[] => {
//     return [
//       {
//         handler: () => {
//           console.log('ХУЙ')
//         },
//         text: 'Print',
//       },
//       {
//         handler: () => {},
//         text: 'Remove',
//       },
//     ]
//   }
//
//   //Для чекбоксов
//   // const getRowId = 'id'
//   // const [selectedIds, setSelectedIds] = useState([1])
//
//   return (
//     <MyTable
//       columns={columns}
//       data={data}
//       getRowActions={getRowActions}
//       // getRowId={getRowId}
//       //Это для чекбоксов
//       // onSelectionChange={setSelectedIds}
//       // selectedIds={selectedIds}
//       verticalAlign={'top'}
//       wordWrap
//     />
//   )
// }
