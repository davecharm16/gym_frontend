export const base_url = 'https://gym-node-backend.onrender.com/api'

export const endPoint = {
  login : '/auth/login',
  students: '/students',
  register: '/auth/registerStudent',
  student: (id: string) => `/students/${id}`,
  subscriptions: '/subscriptions',
  subscription: (id: string) => `/subscriptions/${id}`,
  instructor: '/instructor',
  checkIn: `/checkIn`,
  attendance: `/attendance`,
  trainings: '/trainings',
  payment: '/payment',
  paymentAverage: '/payment/average',
  totalRegistered: '/dashboard/total-registered',
  paymentReport: '/payment/all-with-student',
  enroll: "/enroll",
  requestPasswordReset : "/auth/reset-password",
  forceResetPassword : "/auth/admin-reset-password"
};
