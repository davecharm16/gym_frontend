
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LogoutIcon from '@mui/icons-material/Logout';

interface SidebarListProps {
  onLogout: () => void;
  onNavigate: (path: string) => void;
}

export default function SidebarList({ onLogout, onNavigate }: SidebarListProps) {
  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton onClick={() => onNavigate('/dashboard')}>

          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton onClick={() => onNavigate('/profile-management')}>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary="Profile Management" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton onClick={() => onNavigate('/attendance-log')}>
          <ListItemIcon><EventNoteIcon /></ListItemIcon>
          <ListItemText primary="Attendance Log" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton onClick={onLogout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
