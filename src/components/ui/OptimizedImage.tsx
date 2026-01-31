'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// Base64 encoded simple blur placeholder
const BLUR_DATA_URL =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM5Y2EzYWYiLz48L3N2Zz4=';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
    wrapperClassName?: string;
}

export default function OptimizedImage({
    src,
    alt,
    className,
    wrapperClassName,
    priority = false,
    ...props
}: OptimizedImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className={cn('overflow-hidden', wrapperClassName)}>
            <Image
                src={src}
                alt={alt}
                className={cn(
                    'duration-500 ease-in-out',
                    isLoading
                        ? 'scale-105 blur-lg grayscale'
                        : 'scale-100 blur-0 grayscale-0',
                    className
                )}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                loading={priority ? undefined : 'lazy'}
                onLoad={() => setIsLoading(false)}
                {...props}
            />
        </div>
    );
}
