
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
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SidebarList from './SidebarList';

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
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 8 }}>
        <SidebarList
          onNavigate={handleNavigate}
        />
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
