import { Metadata } from '@grpc/grpc-js';

export function createUserMetadata(userId: string): Metadata {
  if (!userId) {
    throw new Error('Missing userId when construct userId');
  }

  const metadata = new Metadata();

  metadata.add('userId', userId);

  return metadata;
}
