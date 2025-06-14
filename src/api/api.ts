export const base_url = 'https://gym-node-backend.onrender.com/api'

export const endPoint = {
  login : '/auth/login',
  students: '/students',
  register: '/auth/registerStudent',
  student: (id: string) => `/students/${id}`,
}