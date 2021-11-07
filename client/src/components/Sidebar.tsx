import { ListItem, ListItemIcon, ListItemText, Box, Badge } from '@mui/material';
import { home, messaging, network, jobs, work, notifications } from '../assets/icons';

const menu = [
  { text: 'Home', icon: home },
  { text: 'Network', icon: network },
  { text: 'Jobs', icon: jobs },
  { text: 'Messaging', icon: messaging },
  { text: 'Notifications', icon: notifications },
  { text: 'Work', icon: work },
];

const Sidebar = () => (
  <Box sx={{ padding: 2 }}>
    {menu.map(({ text, icon }, index) => (
      <ListItem button key={text}>
        <ListItemIcon>
          {index === 4 ? (
            <Badge badgeContent={5} color="primary" overlap="circular">
              <img src={icon} width="40" height="40" />
            </Badge>
          ) : <img src={icon} width="40" height="40" />}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    ))}
  </Box>
);

export default Sidebar;
