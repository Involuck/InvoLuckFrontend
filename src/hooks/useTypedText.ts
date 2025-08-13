import { useEffect, useState } from 'react';

interface UseTypedTextOptions {
  speedMs?: number;
  startDelayMs?: number;
}

export function useTypedText(fullText: string, options: UseTypedTextOptions = {}) {
  const { speedMs = 22, startDelayMs = 200 } = options;
  const [text, setText] = useState('');

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let index = 0;

    const start = () => {
      const tick = () => {
        index += 1;
        setText(fullText.slice(0, index));
        if (index < fullText.length) {
          timeoutId = setTimeout(tick, speedMs);
        }
      };
      tick();
    };

    timeoutId = setTimeout(start, startDelayMs);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [fullText, speedMs, startDelayMs]);

  return text;
}

export default useTypedText;

