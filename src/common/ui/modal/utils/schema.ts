import z from 'zod'

const currentDate = new Date()

currentDate.setHours(0, 0, 0, 0)
export const addFormSchema = z.object({
  ATICode: z
    .string({ message: 'Введите корректный код' })
    .min(4, { message: 'Слишком маленький код' })
    .max(10, { message: 'Слишком большой код' }),
  CarrierContactNumber: z
    .string({ message: 'Введите контактный номер' })
    .regex(/^\d+$/, { message: 'Разрешены только цифры' })
    .min(11, { message: 'Не корректный номер' })
    .max(11, { message: 'Не корректный номер' })
    .transform(value => {
      if (!value) {
        return ''
      }
      const phoneNumber = value.replace(/[^\d]/g, '')

      if (phoneNumber.length < 10) {
        return phoneNumber
      }
      const formattedNumber = `+7 (${phoneNumber.substring(1, 4)}) ${phoneNumber.substring(
        4,
        7
      )}-${phoneNumber.substring(7, 9)}-${phoneNumber.substring(9, 11)}`

      return formattedNumber
    }),

  CarriersFullName: z
    .string()
    .regex(/^[а-яА-ЯёЁ][а-яА-ЯёЁ]*\s[а-яА-ЯёЁ][а-яА-ЯёЁ]*\s[а-яА-ЯёЁ][а-яА-ЯёЁ]*$/, {
      message: 'Некорректный формат ФИО',
    })
    .min(10, { message: 'Некорректный ввод имени' })
    .max(50, { message: 'Некорректный ввод имени' }),
  applicationNumber: z
    .string({ message: 'Введите корректный номер заявки' })
    .min(4, { message: 'Слишком короткий номер заявки' })
    .max(10, { message: 'Слишком длинный номер заявки' }),
  comment: z
    .string()
    .min(6, { message: 'Комментарий минимум 6 символов' })
    .max(61, { message: 'Слишком большой комментарий' }),
  companyName: z
    .string()
    .min(3, { message: 'Введите минимум 3 символа' })
    .max(21, { message: 'Максимум 10 символов' }),
  date: z
    .string()
    .optional()
    .transform(value => {
      if (!value) {
        const currentDate = new Date()
        const formattedDate = currentDate.toLocaleDateString('ru-RU').replace(/\//g, '.')
        const formattedTime = currentDate.toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        })

        return `${formattedDate} ${formattedTime}`
      }

      return value
    })
    .superRefine((value, ctx) => {
      if (value && !/^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/.test(value)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Неверный формат даты и времени',
        })
      }
    })
    .transform(value => {
      if (!value) {
        const currentDate = new Date()

        return currentDate.toLocaleString('ru-RU', {
          day: '2-digit',
          hour: '2-digit',
          hour12: false,
          minute: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      }
      const [day, month, year, hour, minute] = value.split(/\.|:|\s/).map(Number)
      const date = new Date(year, month - 1, day, hour, minute)

      return date.toLocaleString('ru-RU', {
        day: '2-digit',
        hour: '2-digit',
        hour12: false,
        minute: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    }),
  statusApp: z
    .string()
    .regex(/^(Новая|В работе|Завершено)$/, { message: 'Недопустимое значение' })
    .transform(value => {
      return value
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    })
    .optional(),
})
export type AddFormValues = z.infer<typeof addFormSchema>
