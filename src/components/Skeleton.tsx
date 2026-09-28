import { useEffect, useState } from 'react';

const pulse =
  'animate-pulse bg-neutral-900 border border-gold-900/20 rounded-xl';

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`${pulse} ${className}`} aria-hidden="true" />;
}

export function ServiceCardSkeleton() {
  return (
    <div className={`${pulse} overflow-hidden rounded-2xl`}>
      <Skeleton className="h-64 rounded-none border-0" />
      <div className="space-y-3 p-6">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

export function TeamCardSkeleton() {
  return <Skeleton className="aspect-[3/4] w-full rounded-2xl" />;
}

export function OfferCardSkeleton() {
  return (
    <div className={`${pulse} overflow-hidden rounded-3xl`}>
      <Skeleton className="min-h-[220px] rounded-none border-0" />
      <div className="space-y-3 p-6">
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-9 w-32 rounded-full" />
      </div>
    </div>
  );
}

export function GalleryItemSkeleton() {
  return <Skeleton className="aspect-[4/5] w-full rounded-2xl" />;
}

/** True once every image has loaded, failed, or the timeout elapses. */
export function useImagesReady(sources: Array<string | undefined | null>, timeoutMs = 4000): boolean {
  const key = sources.filter((src): src is string => Boolean(src)).join('|');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const urls = key ? key.split('|') : [];
    if (urls.length === 0) {
      setReady(true);
      return;
    }

    setReady(false);
    let remaining = urls.length;
    let cancelled = false;

    const finishOne = (settled: { current: boolean }) => {
      if (settled.current || cancelled) return;
      settled.current = true;
      remaining -= 1;
      if (remaining <= 0) setReady(true);
    };

    const timeout = window.setTimeout(() => {
      if (!cancelled) setReady(true);
    }, timeoutMs);

    const images = urls.map((src) => {
      const settled = { current: false };
      const img = new Image();
      img.onload = () => finishOne(settled);
      img.onerror = () => finishOne(settled);
      img.src = src;
      if (img.complete) finishOne(settled);
      return img;
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [key, timeoutMs]);

  return ready;
}
