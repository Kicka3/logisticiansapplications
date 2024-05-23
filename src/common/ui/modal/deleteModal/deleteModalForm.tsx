import { Typography } from '@/common/ui/typography'
import { Button, Modal, ThemeProvider } from '@gravity-ui/uikit'

import s from './deleteModalForm.module.scss'

type Props = {
  isDeleteModalOpen: boolean
  onDeleteApplication: () => void
  setIsDeleteModalOpen: (value: boolean) => void
}

export const DeleteModalForm = ({
  isDeleteModalOpen,
  onDeleteApplication,
  setIsDeleteModalOpen,
}: Props) => {
  const deleteApplicationHandler = () => {
    onDeleteApplication()

    setIsDeleteModalOpen(false)
  }

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false)
  }

  return (
    <>
      <ThemeProvider>
        <Modal
          aria-label={'addNewApplication'}
          autoFocus
          className={s.modal}
          contentOverflow={'visible'}
          onClose={handleCloseModal}
          open={isDeleteModalOpen}
        >
          <div className={s.contentWrapper}>
            <Typography variant={'body1'}>{`Вы действительно хотите удалить заявку ?`}</Typography>
            <div className={s.modalContent}>
              <div className={s.btnGroup}>
                <Button
                  className={s.modalBtn}
                  onClick={handleCloseModal}
                  size={'l'}
                  view={'outlined-action'}
                >
                  Отмена
                </Button>
                <Button
                  className={s.modalBtn}
                  onClick={deleteApplicationHandler}
                  size={'l'}
                  view={'outlined-action'}
                >
                  Удалить
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </ThemeProvider>
    </>
  )
}
