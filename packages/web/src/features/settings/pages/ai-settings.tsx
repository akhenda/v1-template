'use client';

import React from 'react';

import { SaveIcon } from 'lucide-react';

import { Button } from '@repo/design-system/components/ui/button';
import { Card, CardContent } from '@repo/design-system/components/ui/card';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/design-system/components/ui/select';

export function AISettingsPage() {
  return (
    <div className="container">
      <div className="max-w-5xl">
        <div className="mb-5">
          <h1 className="font-bold text-3xl">AI Settings</h1>
          <p className="text-muted-foreground">Manage your AI preferences</p>
        </div>

        <Card>
          <CardContent className="space-y-6">
            <div>
              <Label className="mb-2 font-semibold">AI Provider</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an AI provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="cohere">Cohere</SelectItem>
                  <SelectItem value="cohere">Google</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 font-semibold">Model</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an AI model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="cohere">Cohere</SelectItem>
                  <SelectItem value="cohere">Google</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 font-semibold">API Key</Label>
              <Input type="password" placeholder="Enter your API key" />
            </div>

            <div className="flex justify-end pt-4">
              <Button>
                Save Changes <SaveIcon className="mr-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
