import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useAuthStore } from '../../../store/auth/authStore';
import { sidebarRoutes } from '../../../routes/SidebarRoutes';



interface SidebarListProps {
  onNavigate: (path: string) => void;
}

export default function SidebarList({onNavigate }: SidebarListProps) {
  const role = useAuthStore((state) => state.user?.role); // 'admin' | 'student'

  return (
    <List>
      {sidebarRoutes
        .filter((item) => item.roles.includes(role!))
        .map((item) => (
          console.log(item.label),
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={
                () => item.path && onNavigate(item.path)
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
  );
}