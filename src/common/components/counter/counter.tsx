import { createSignal } from 'solid-js';

export function Counter() {
  const [count, setCount] = createSignal(0);
  return (
    <button class="increment" onClick={() => setCount(count() + 2)}>
      Clicks: {count()}
    </button>
  );
}
