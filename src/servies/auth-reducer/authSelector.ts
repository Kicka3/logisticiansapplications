import { RootState } from '@/servies/store'

export const selectIsAdmin = (state: RootState) => state.auth.isAdmin
