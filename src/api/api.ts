export const base_url = 'https://vercel.com/davecharm16s-projects/gym-backend/api'
// export const base_url = 'https://gym-node-backend.onrender.com/api'

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
  training: (id: string) => `/trainings/${id}`,
  payment: '/payment',
  paymentAverage: '/payment/average',
  totalRegistered: '/dashboard/total-registered',
  paymentReport: '/payment/all-with-student',
  enroll: "/enroll",
  requestPasswordReset : "/auth/reset-password",
  forceResetPassword : "/auth/admin-reset-password",
  uploadProfile: (id?: string) =>
    id
      ? `/upload/${id}/upload-profile-image`
      : `/upload/upload-profile-image`,
};
