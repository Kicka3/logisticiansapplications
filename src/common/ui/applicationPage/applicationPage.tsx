import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { ModeForm } from '@/common/enums/enums'
import { DeleteModalForm } from '@/common/ui/modal/deleteModal'
import { AddFormValues } from '@/common/ui/modal/utils/schema'
import { Typography } from '@/common/ui/typography'
import { UpdateApplication } from '@/features/updateApplication'
import {
  useDeleteApplicationMutation,
  useGetApplicationsByIdQuery,
} from '@/servies/applications/applications.service'
import { selectIsAdmin } from '@/servies/auth-reducer/authSelector'

import s from './applicationPage.module.scss'

export const ApplicationPage = () => {
  const isAdmin = useSelector(selectIsAdmin)

  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [openEditeForm, setOpenEditeForm] = useState(false)
  const [initialValues, setInitialValues] = useState<AddFormValues | undefined>(undefined)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const { data: application, isLoading } = useGetApplicationsByIdQuery({ id })
  const [deleteApplication] = useDeleteApplicationMutation()

  if (!application) {
    return <Typography variant={'h1'}>Application not found</Typography>
  }

  const onEditeApp = async () => {
    setOpenEditeForm(true)

    setInitialValues({
      ATICode: application.atiCode,
      CarrierContactNumber: application.carrierPhone,
      CarriersFullName: application.carrierFullName,
      applicationNumber: application.applicationNumber,
      comment: application.comment,
      companyName: application.clientCompanyName,
      date: application.date,
      statusApp: application.status, // Убедитесь, что статус также передается, если он является частью формы
    })
  }

  const onDeleteApp = () => {
    setIsDeleteModalOpen(true)
  }

  const onDeleteApplication = async () => {
    try {
      id && (await deleteApplication({ id }).unwrap())
      navigate('/')
    } catch (err) {
      console.log('Ошибка при удалении заявки:', err)
    }
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
        <Typography
          variant={'h1'}
        >{`Информация о заявке # ${application.applicationNumber}`}</Typography>

        <div className={s.btnGroupWrapper}>
          <button className={s.backButton} onClick={onBack}>
            Назад
          </button>

          {isAdmin && (
            <>
              <button className={s.editButton} onClick={onEditeApp}>
                Редактировать
              </button>
              <button className={s.deleteButton} onClick={onDeleteApp}>
                Удалить
              </button>
            </>
          )}
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
            <span className={s.label}>Status:</span>
            <span className={s.value}>{application.status}</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.label}>ATI Code:</span>
            <span className={s.value}>{application.atiCode}</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.label}>Date:</span>
            <span className={s.value}>{application.date}</span>
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
          initialValues={initialValues}
          isOpen={openEditeForm}
          setIsOpen={setOpenEditeForm}
          setOpenEditeForm={setOpenEditeForm}
          typeForm={ModeForm.UPDATE}
        />
      )}
      <DeleteModalForm
        isDeleteModalOpen={isDeleteModalOpen}
        onDeleteApplication={onDeleteApplication}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
    </div>
  )
}
