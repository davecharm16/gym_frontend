export const base_url = 'https://gym-node-backend.onrender.com/api'

export const endPoint = {
  login : '/auth/login',
  students: '/students',
  student: (id: string) => `/students/${id}`,
}