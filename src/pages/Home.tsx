import { Button, Container, Typography } from '@mui/material';
import { useAuthStore } from '../store/auth/authStore';

const Home = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return (
    <Container>
      <Typography variant="h4">Welcome, {user?.name}</Typography>
      <Button onClick={logout}>Logout</Button>
    </Container>
  );
};

export default Home;
