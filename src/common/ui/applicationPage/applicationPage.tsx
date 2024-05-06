// import { useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
//
// import {
//   useGetApplicationsByIdQuery,
//   useUpdateApplicationMutation,
// } from '@/servies/applications/applications.service'
//
// import s from './applicationPage.module.scss'
//
// export const ApplicationPage = () => {
//   const navigate = useNavigate()
//   const { id } = useParams<{ id: string }>()
//
//   const [openEditeForm, setOpenEditeForm] = useState(false)
//
//   const { data: application, isLoading, refetch } = useGetApplicationsByIdQuery({ id })
//   const [updateApplication] = useUpdateApplicationMutation()
//
//   if (!application) {
//     return <h1>Application not found</h1>
//   }
//
//   const onEditeApp = async (updateData: any) => {
//     try {
//       await updateApplication({ id, ...updateData }).unwrap()
//       refetch()
//       setOpenEditeForm(true)
//     } catch (err) {
//       console.error('Ошибка при обновлении завяки:', err)
//     }
//   }
//
//   if (isLoading) {
//     return <div>Loading...</div>
//   }
//
//   const onBack = () => {
//     navigate('/')
//   }
//
//   return (
//     <div className={s.container}>
//       <header className={s.header}>
//         <h1>Информация о заявке</h1>
//         <div className={s.btnGroupWrapper}>
//           <button className={s.backButton} onClick={onBack}>
//             Назад
//           </button>
//           <button className={s.editButton} onClick={onEditeApp}>
//             Редактировать
//           </button>
//         </div>
//       </header>
//       <main className={s.main}>
//         <section className={s.info}>
//           <h2>Информация</h2>
//           <div className={s.infoRow}>
//             <span className={s.label}>ID:</span>
//             <span className={s.value}>{application.id}</span>
//           </div>
//           <div className={s.infoRow}>
//             <span className={s.label}>Date:</span>
//             <span className={s.value}>{application.date}</span>
//           </div>
//           <div className={s.infoRow}>
//             <span className={s.label}>Status:</span>
//             <span className={s.value}>{application.status}</span>
//           </div>
//           <div className={s.infoRow}>
//             <span className={s.label}>ATI Code:</span>
//             <span className={s.value}>{application.atiCode}</span>
//           </div>
//
//           <div className={s.infoRow}>
//             <span className={s.label}>Carrier Phone:</span>
//             <span className={s.value}>{application.carrierPhone}</span>
//           </div>
//         </section>
//         <section className={s.description}>
//           <div className={s.descHeadWrapper}>
//             <div className={s.infoRow}>
//               <span className={s.label}>ФИО Перевозчика:</span>
//               <span className={s.value}>{application.carrierFullName}</span>
//             </div>
//             <div className={s.infoRow}>
//               <span className={s.label}>Название фирмы клиента:</span>
//               <span className={s.value}>{application.clientCompanyName}</span>
//             </div>
//           </div>
//           <div>
//             <h2>Комментарий:</h2>
//             <p>{application.comment}</p>
//           </div>
//         </section>
//       </main>
//       {/*{openEditeForm && (*/}
//       {/*  <CreateApplication*/}
//       {/*    isOpen={openEditeForm}*/}
//       {/*    setIsOpen={setOpenEditeForm}*/}
//       {/*    setTypeForm={() => ModeForm.ADD}*/}
//       {/*    typeForm={ModeForm.UPDATE}*/}
//       {/*  />*/}
//       {/*)}*/}
//     </div>
//   )
// }

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ModeForm } from '@/common/enums/enums'
import { UpdateApplication } from '@/features/updateApplication'
import { useGetApplicationsByIdQuery } from '@/servies/applications/applications.service'

import s from './applicationPage.module.scss'

export const ApplicationPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [openEditeForm, setOpenEditeForm] = useState(false)

  const { data: application, isLoading } = useGetApplicationsByIdQuery({ id })
  // const [updateApplication] = useUpdateApplicationMutation()

  //TEST
  const [typeForm, setTypeForm] = useState(ModeForm.ADD)

  if (!application) {
    return <h1>Application not found</h1>
  }

  const onEditeApp = async () => {
    setOpenEditeForm(true)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  const onBack = () => {
    navigate('/')
  }

  return (
    <div className={s.container}>
      <header className={s.header}>
        <h1>Информация о заявке</h1>
        <div className={s.btnGroupWrapper}>
          <button className={s.backButton} onClick={onBack}>
            Назад
          </button>
          <button className={s.editButton} onClick={onEditeApp}>
            Редактировать
          </button>
          <button className={s.deleteButton}>Удалить</button>
        </div>
      </header>
      <main className={s.main}>
        <section className={s.info}>
          <h2>Информация</h2>
          <div className={s.infoRow}>
            <span className={s.label}>ID:</span>
            <span className={s.value}>{application.id}</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.label}>Date:</span>
            <span className={s.value}>{application.date}</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.label}>Status:</span>
            <span className={s.value}>{application.status}</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.label}>ATI Code:</span>
            <span className={s.value}>{application.atiCode}</span>
          </div>

          <div className={s.infoRow}>
            <span className={s.label}>Carrier Phone:</span>
            <span className={s.value}>{application.carrierPhone}</span>
          </div>
        </section>
        <section className={s.description}>
          <div className={s.descHeadWrapper}>
            <div className={s.infoRow}>
              <span className={s.label}>ФИО Перевозчика:</span>
              <span className={s.value}>{application.carrierFullName}</span>
            </div>
            <div className={s.infoRow}>
              <span className={s.label}>Название фирмы клиента:</span>
              <span className={s.value}>{application.clientCompanyName}</span>
            </div>
          </div>
          <div>
            <h2>Комментарий:</h2>
            <p>{application.comment}</p>
          </div>
        </section>
      </main>
      {openEditeForm && (
        <UpdateApplication
          id={id}
          isOpen={openEditeForm}
          setIsOpen={setOpenEditeForm}
          setOpenEditeForm={setOpenEditeForm}
          setTypeForm={setTypeForm}
          typeForm={ModeForm.UPDATE}
        />
      )}
    </div>
  )
}
