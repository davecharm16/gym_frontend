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
  open: boolean; // true = expanded with text, false = mini with icons only
  onLogout: () => void;
  onNavigate: (path: string) => void;
  onClose?: () => void; // Optional, if you want to handle closing the sidebar
}

const drawerWidth = 240;
const miniDrawerWidth = 60;

export default function Sidebar({
  open,
  onLogout,
  onNavigate,
}: SidebarProps) {
  const handleNavigate = (path: string) => {
    onNavigate(path);
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : miniDrawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        transition: 'width 0.3s',
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : miniDrawerWidth,
          transition: 'width 0.3s',
          overflowX: 'hidden',
          boxSizing: 'border-box',
        },
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingTop: 8,
        }}
      >
        {/* Your Sidebar List */}
        <SidebarList onNavigate={handleNavigate} isOpen={open} />

        {/* Sign Out */}
        <Box>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Sign Out"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
}
