import MoreVertRoundedIcon from '@suid/icons-material/MoreVertRounded';
import { createSignal } from 'solid-js';
import { useSearchParams, useNavigate } from 'solid-start';

import { Button } from '~/components/lib/button';
import { Menu, MenuItem } from '~/components/lib/menu';
import { photoResource } from '~/requests/photo-resource';

export const MoreButton = () => {
  const [anchorEl, setAnchorEl] = createSignal<null | HTMLElement>(null);
  const [searchParams] = useSearchParams();
  const nav = useNavigate();

  const deletePhoto = photoResource.mutations.useDeleteById();

  const open = () => Boolean(anchorEl());
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    const { photoId } = searchParams;
    deletePhoto.mutate({ photoId });
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
        style={{ color: 'black' }}
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
