// src/components/Post.tsx

import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';
import { POST_QUERYResult } from '../../sanity.types';

interface ImageValue {
  asset: { _ref: string };
  alt?: string;
}

const SampleImageComponent = ({
  value,
  isInline,
}: {
  value: ImageValue;
  isInline: boolean;
}) => {
  return (
    <Image
      src={urlFor(value)
        .width(isInline ? 100 : 800)
        .fit('max')
        .auto('format')
        .format('webp')
        .url()}
      width={300}
      height={300}
      alt={value.alt || ' '}
      loading="lazy"
    />
  );
};

const components = {
  types: {
    image: SampleImageComponent,
  },
};

export function Post({ post }: { post: POST_QUERYResult }) {
  const { title, mainImage, body } = post || {};

  return (
    <main className="container mx-auto prose prose-lg p-4">
      {title ? <h1>{title}</h1> : null}
      {mainImage?.asset?._ref ? (
        <Image
          className="float-left m-0 w-1/3 mr-4 rounded-lg"
          src={urlFor(mainImage?.asset?._ref)
            .width(300)
            .height(300)
            .format('webp')
            .url()}
          width={300}
          height={300}
          alt={title || ''}
        />
      ) : null}
      {body ? <PortableText value={body} components={components} /> : null}
      <hr />
      <Link href="/">&larr; Return home</Link>
    </main>
  );
}
