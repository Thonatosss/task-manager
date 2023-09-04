import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import icon from '../iconSvg/icon.svg';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserTheme } from '../../redux/auth/authOperations';
import { selectUser } from 'redux/auth/authSelectors';
import { SvgIcon } from '@mui/material';

export const ThemeComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [currentTheme, setCurrentTheme] = useState(user.theme);

  const handleThemeChange = async theme => {
    try {
      await dispatch(updateUserTheme(theme));
      setCurrentTheme(theme);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="theme-button"
        aria-controls={open ? 'theme-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          border: 'none',
          fontFamily: 'Poppins',
          fontWeight: '500',
          color: 'rgba(22, 22, 22, 0.8)',
          padding: 0,
          marginRight: '14px',
        }}
      >
        Theme
        <SvgIcon
          sx={{
            width: '16px',
            height: '16px',
            backgroundColor: 'transparent',
            marginLeft: '4px',
          }}
        >
          <use href={icon + '#chevron-down'}></use>
        </SvgIcon>
      </Button>
      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'theme-button',
        }}
        sx={{
          border: '1px solid rgba(190, 219, 176, 1)',
          fontFamily: 'Poppins',
          fontSize: '14px',
          boxShadow: '0px 2px 4px rgba(17, 17, 17, 0.1)',
          zIndex: '3000',
          '&& .Mui-selected': {
            backgroundColor: 'transparent',
          },
          fontWeight: '400',
        }}
      >
        <MenuItem
          {...(currentTheme === 'light' && {
            selected: true,
            sx: {
              color: 'rgba(190, 219, 176, 1)',
            },
          })}
          onClick={() => handleThemeChange('light')}
        >
          Light
        </MenuItem>
        <MenuItem
          {...(currentTheme === 'dark' && {
            selected: true,
            sx: {
              color: 'rgba(190, 219, 176, 1)',
            },
          })}
          onClick={() => handleThemeChange('dark')}
        >
          Dark
        </MenuItem>
        <MenuItem
          {...(currentTheme === 'violet' && {
            selected: true,
            sx: {
              color: 'rgba(190, 219, 176, 1)',
            },
          })}
          onClick={() => handleThemeChange('violet')}
        >
          Violet
        </MenuItem>
      </Menu>
    </div>
  );
};
