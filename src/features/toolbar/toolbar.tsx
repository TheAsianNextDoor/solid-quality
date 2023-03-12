import HelpIcon from '@suid/icons-material/Help';
import NotificationsIcon from '@suid/icons-material/Notifications';

import { IconButton } from '~/components/lib/icon-button';

import { ProfileMenu } from './profile-menu';

export const Toolbar = () => {
  return (
    <div class="flex flex-row justify-end">
      <div>
        <IconButton aria-label="help" size="large">
          <HelpIcon style={{ color: 'black' }} />
        </IconButton>
      </div>
      <div>
        <IconButton aria-label="notifications" size="large">
          <NotificationsIcon />
        </IconButton>
      </div>
      <div>
        <ProfileMenu />
      </div>
    </div>
  );
};
