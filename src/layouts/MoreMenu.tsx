import { DotsHorizontalIcon } from '@heroicons/react/solid';
import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Button, ListItemIcon, ListItemText, SvgIcon } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';

import { Link } from '../components/primitives/Link';
import { moreNavigation } from '../ui-config/menu-items';

export function MoreMenu() {
  const { i18n } = useLingui();
  const { currentAccount: walletAddress } = useWeb3Context();

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (moreNavigation.length === 0) {
    return null;
  }

  return (
    <>
      <Button
        aria-label="more"
        id="more-button"
        aria-controls={open ? 'more-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          color: 'rgba(255, 255, 255, 0.5)',
          minWidth: 'unset',
          p: '6px 8px',
          '&:hover': {
            color: '#fff',
          },
        }}
      >
        <Trans>More</Trans>
        <SvgIcon color="inherit" sx={{ ml: 1 }}>
          <DotsHorizontalIcon />
        </SvgIcon>
      </Button>

      <Menu
        id="more-menu"
        MenuListProps={{
          'aria-labelledby': 'more-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        keepMounted={true}
      >
        {moreNavigation.map((item, index) => (
          <MenuItem
            component={Link}
            href={item.makeLink ? item.makeLink(walletAddress) : item.link}
            key={index}
          >
            <ListItemIcon>
              <SvgIcon sx={{ fontSize: '20px' }}>{item.icon}</SvgIcon>
            </ListItemIcon>
            <ListItemText>{i18n._(item.title)}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
