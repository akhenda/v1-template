import { describe, expect, it } from 'bun:test';

import { getAvatar, getName } from '~/lib/utils';
import type { User } from '~/types';

describe('getName', () => {
  it('returns fullName when available', () => {
    const user = { fullName: 'John Doe' } as User;

    expect(getName(user)).toBe('John Doe');
  });

  it('returns username when fullName is not available', () => {
    const user = { username: 'john.doe' } as User;

    expect(getName(user)).toBe('john.doe');
  });

  it('returns name from email when no other name is available', () => {
    const user = { emailAddresses: [{ emailAddress: 'john.doe@example.com' }] } as User;

    expect(getName(user)).toBe('john.doe');
  });

  it('returns undefined when no name source is available', () => {
    const user = {} as User;

    expect(getName(user)).toBeUndefined();
  });
});

describe('getAvatar', () => {
  it('returns identity avatar_url when available', () => {
    const imageUrl = 'https://example.com/avatar.jpg';
    const user = { imageUrl } as User;

    expect(getAvatar(user)).toBe(imageUrl);
  });

  it('returns undefined when no avatar is available', () => {
    const user = {} as User;

    expect(getAvatar(user)).toBeUndefined();
  });
});
