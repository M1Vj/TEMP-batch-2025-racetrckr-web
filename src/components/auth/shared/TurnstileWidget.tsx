'use client';

import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useRef, useCallback } from 'react';

interface TurnstileWidgetProps {
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

export default function TurnstileWidget({
  onSuccess,
  onError,
  onExpire
}: TurnstileWidgetProps) {
  const turnstileRef = useRef<TurnstileInstance>(null);

  const handleError = useCallback(() => {
    onError?.();
    turnstileRef.current?.reset();
  }, [onError]);

  const handleExpire = useCallback(() => {
    onExpire?.();
    turnstileRef.current?.reset();
  }, [onExpire]);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    console.warn('Turnstile site key not configured');
    return null;
  }

  return (
    <div className="flex justify-center">
      <Turnstile
        ref={turnstileRef}
        siteKey={siteKey}
        onSuccess={onSuccess}
        onError={handleError}
        onExpire={handleExpire}
        options={{
          theme: 'light',
          size: 'normal',
        }}
      />
    </div>
  );
}
