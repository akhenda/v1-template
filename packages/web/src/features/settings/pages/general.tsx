'use client';

import React from 'react';

import { UserProfile } from '@clerk/nextjs';

import { Loader } from '@repo/design-system/components/loader';

// import './styles.css';

export function SettingsPage() {
  return (
    <div className="container">
      <div className="max-w-5xl">
        <div className="mb-5">
          <h1 className="font-bold text-3xl">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences</p>
        </div>

        <UserProfile
          additionalOAuthScopes={{ github: ['repo', 'read:org'] }}
          fallback={
            <div className="flex h-80 w-[70%] items-center justify-center self-center">
              <Loader className="h-8 w-8" />
            </div>
          }
        />
      </div>
    </div>
  );
}
