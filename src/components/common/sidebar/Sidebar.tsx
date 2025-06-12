
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BadgeIcon from '@mui/icons-material/Badge';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
  onNavigate: (path: string) => void;
}

const drawerWidth = 240;

export default function Sidebar({ open, onClose, onLogout, onNavigate }: SidebarProps) {
  const handleNavigate = (path: string) => {
    onNavigate(path);
    onClose(); // Close drawer after navigation
  };

  const handleLogout = () => {
    onLogout();
    onClose(); // Close drawer after logout
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      variant="temporary"
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: 'none',
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <List sx={{ mt: 8 }}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigate('/')}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigate('/profile-management')}>
              <ListItemIcon><AccountBoxIcon /></ListItemIcon>
              <ListItemText primary="Profile Management" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigate('/attendance-log')}>
              <ListItemIcon><BadgeIcon /></ListItemIcon>
              <ListItemText primary="Attendance Logs" />
            </ListItemButton>
          </ListItem>
        </List>

        <Box>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                <ListItemText primary="Sign Out" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
}
