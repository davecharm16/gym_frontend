import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../../utils/schema/registerStudentSchema'; // adjust path

type RegisterFormInputs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type RegisterModalProps = {
  open: boolean;
  onClose: () => void;
};

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormInputs) => {
    console.log('Form Data:', data);
    onClose(); // Close after successful submission
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Register
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            label="First Name"
            margin="normal"
            {...register('first_name')}
            error={!!errors.first_name}
            helperText={errors.first_name?.message}
          />

          <TextField
            fullWidth
            label="Last Name"
            margin="normal"
            {...register('last_name')}
            error={!!errors.last_name}
            helperText={errors.last_name?.message}
          />

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            label="Password"
            margin="normal"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default RegisterModal;
