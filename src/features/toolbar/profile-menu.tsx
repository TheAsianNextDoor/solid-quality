import { signOut } from '@auth/solid-start/client';
import AccountCircleIcon from '@suid/icons-material/AccountCircle';
import ChevronRightIcon from '@suid/icons-material/ChevronRight';
import HelpIcon from '@suid/icons-material/Help';
import LogoutIcon from '@suid/icons-material/Logout';
import SettingsIcon from '@suid/icons-material/Settings';
import { createSignal } from 'solid-js';
import { useNavigate } from 'solid-start';

import { IconButton } from '~/components/lib/icon-button';
import { Menu, MenuItem } from '~/components/lib/menu';
import { trpcClient } from '~/utils/trpc';

import type { JSX, Component } from 'solid-js';

interface props {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
}

const ListItem: Component<props> = (props) => {
  return (
    <MenuItem
      onClick={props.onClick}
      style={{ 'min-width': '20rem', 'justify-content': 'space-between' }}
      class="flex flex-row"
    >
      <div>
        {props.icon}
        <span class="pl-2">{props.label}</span>
      </div>
      <ChevronRightIcon />
    </MenuItem>
  );
};

export const ProfileMenu = () => {
  const [anchorElement, setAnchorElement] = createSignal<HTMLElement | null>(null);
  const sessionQuery = trpcClient.session.getUserName.useQuery();
  const nav = useNavigate();

  const isOpen = () => Boolean(anchorElement());
  const handleClose = () => setAnchorElement(null);

  return (
    <>
      <IconButton
        aria-controls={isOpen() ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen() ? 'true' : undefined}
        onClick={(event) => setAnchorElement(event.currentTarget)}
        size="large"
      >
        <AccountCircleIcon style={{ color: 'black' }} />
      </IconButton>

      <Menu
        style={{ 'min-width': '20rem' }}
        anchorEl={anchorElement()}
        open={isOpen()}
        onClose={handleClose}
        onClick={handleClose}
      >
        <span class="pl-5">{sessionQuery.data}</span>
        <div class="p-1" />
        <hr />
        <div class="p-1" />

        <ListItem icon={<SettingsIcon />} onClick={() => nav('/settings')} label="Settings" />
        <ListItem icon={<HelpIcon />} onClick={() => nav('/help')} label="Help and Support" />
        <ListItem icon={<LogoutIcon />} onClick={() => signOut()} label="Logout" />
      </Menu>
    </>
  );
};
