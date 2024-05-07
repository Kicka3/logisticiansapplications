import z from 'zod'
const currentDate = new Date()
const statusRegex = /^(В работе|Завершено|Новая)$/
const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})(,|\s)(\d{2}):(\d{2})$/

const dateSchema = z.string().transform(value => {
  if (value === '') {
    const now = new Date()

    return now.toLocaleString('ru-RU', {
      day: '2-digit',
      hour: '2-digit',
      hour12: false,
      minute: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  if (!dateRegex.test(value)) {
    throw new z.ZodError([
      {
        code: 'custom',
        message: 'Неверный формат даты и времени. Используйте формат дд.мм.гггг чч:мм',
        path: ['date'],
      },
    ])
  }

  const match = value.match(dateRegex)

  if (!match) {
    throw new z.ZodError([
      {
        code: 'custom',
        message: 'Неверный формат даты и времени',
        path: ['date'],
      },
    ])
  }
  //** separator - нужен для разделения времени */
  const [, day, month, year, separator, hour, minute] = match

  const date = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute))

  if (isNaN(date.getTime())) {
    throw new z.ZodError([
      {
        code: 'custom',
        message: 'Неверный формат даты и времени',
        path: ['date'],
      },
    ])
  }

  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
})

currentDate.setHours(0, 0, 0, 0)
export const addFormSchema = z.object({
  ATICode: z
    .string({ message: 'Введите корректный код' })
    .min(4, { message: 'Слишком маленький код' })
    .max(10, { message: 'Слишком большой код' }),
  CarrierContactNumber: z
    .string({ message: 'Введите контактный номер' })
    .regex(/^(\+7|8)\s?\(?(\d{3})\)?\s?(\d{3})-?(\d{2})-?(\d{2})$/, {
      message: 'Некорректный формат номера телефона',
    })
    .transform(value => {
      if (!value) {
        return ''
      }
      const phoneNumber = value.replace(/[^\d]/g, '')
      let formattedNumber = ''

      if (phoneNumber.startsWith('7') || phoneNumber.startsWith('8')) {
        formattedNumber = `+7 (${phoneNumber.substring(1, 4)}) ${phoneNumber.substring(
          4,
          7
        )}-${phoneNumber.substring(7, 9)}-${phoneNumber.substring(9, 11)}`
      } else {
        formattedNumber = `+7 (${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(
          3,
          6
        )}-${phoneNumber.substring(6, 8)}-${phoneNumber.substring(8, 10)}`
      }

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
    .min(1, { message: 'Слишком короткий номер заявки' })
    .max(6, { message: 'Слишком длинный номер заявки' }),
  comment: z
    .string()
    .min(6, { message: 'Комментарий минимум 6 символов' })
    .max(61, { message: 'Слишком большой комментарий' }),
  companyName: z
    .string()
    .min(3, { message: 'Введите минимум 3 символа' })
    .max(21, { message: 'Максимум 10 символов' }),
  date: dateSchema,
  statusApp: z.string().regex(statusRegex).optional().or(z.literal('')),
})

export type AddFormValues = z.infer<typeof addFormSchema>
