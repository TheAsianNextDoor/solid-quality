import CloseIcon from '@suid/icons-material/Close';
import { useNavigate, useSearchParams } from 'solid-start';

export const CloseButton = () => {
  const [searchParams] = useSearchParams();
  const nav = useNavigate();

  return (
    <div
      class="top-0 left-0 ml-10 mt-10 absolute cursor-pointer"
      style={{
        width: '40px',
        background: 'rgba(0, 0, 0, 0.20)',
        'border-radius': '50%',
      }}
      onClick={() => nav(`/task/${searchParams.taskId}?tab=photos`)}
    >
      <CloseIcon class="text-neutral-300" style={{ 'font-size': '40px' }} />
    </div>
  );
};
