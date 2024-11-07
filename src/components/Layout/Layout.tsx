import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { CssBaseline, Divider, List, styled } from '@mui/material';
import MenuItems from './MenuItems';
import { ExpandMore, KeyboardArrowRight } from '@mui/icons-material';

const drawerWidth = 240
const appBarHeight = 64

interface NavBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<NavBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  height: appBarHeight,
  ...(open && {
    width: `calc(100%)`,
    marginLeft: drawerWidth,
  }),
}))

export default function Layout() {
  const [open, setOpen] = useState(false)

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          width: 0,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }),
      },
    }),
  );


  return (
    <>
      <CssBaseline />
      <AppBar open={open} sx={{ top: 'initial' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpen(!open)}
          >
            {open ? <ExpandMore /> : <KeyboardArrowRight/>}
          </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
            STP FXGO -{'>'} Sierra Monitor
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
      <Drawer open={open} variant="permanent" >
        <Toolbar
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1] }}
        />
        <List component="nav">
          <MenuItems />
          <Divider sx={{ my: 1 }} />
        </List>
      </Drawer>
    </>
  )
}
