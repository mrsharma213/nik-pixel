'use client';

import { useState } from 'react';

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.5px] rounded-full transition-colors cursor-pointer"
      style={{
        background: copied ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.1)',
        color: copied ? '#22c55e' : '#ffffff',
      }}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
