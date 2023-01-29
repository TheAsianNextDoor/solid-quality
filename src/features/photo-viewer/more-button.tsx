import MoreVertRoundedIcon from '@suid/icons-material/MoreVertRounded';
import { createSignal } from 'solid-js';
import { useSearchParams, useNavigate } from 'solid-start';

import { Button } from '~/components/lib/button';
import { Menu, MenuItem } from '~/components/lib/menu';
import { wait } from '~/utils/time-utils';
import { queryClient, trpcClient } from '~/utils/trpc';

export const MoreButton = () => {
  const [anchorEl, setAnchorEl] = createSignal<null | HTMLElement>(null);
  const [searchParams] = useSearchParams();
  const nav = useNavigate();

  const deletePhotoMutation = trpcClient.photo.deleteById.useMutation();

  const open = () => Boolean(anchorEl());
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    const { photoId } = searchParams;
    await deletePhotoMutation.mutateAsync({ photoId });
    // @ts-ignore query invalidate
    queryClient.invalidateQueries({ queryKey: () => ['photo.signedGetUrlsByTask', { taskId: searchParams.taskId }] });
    nav(`/task/${searchParams.taskId}?tab=photos`);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open() ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open() ? 'true' : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <MoreVertRoundedIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl()}
        open={open()}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Placeholder</MenuItem>
        <MenuItem onClick={handleClose}>Placeholder</MenuItem>
      </Menu>
    </>
  );
};
