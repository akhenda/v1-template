'use client';

import { Cloud, File, Loader2 } from 'lucide-react';
import * as React from 'react';
import { useDropzone } from 'react-dropzone';

import type { AnyValue } from '@repo/types';

import { cn } from '../../../lib/utils';
import { Button } from '../../ui/button';

interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  maxSize?: number;
  maxFiles?: number;
  accept?: Record<string, string[]>;
  disabled?: boolean;
  onFilesSelected?: (files: File[]) => void;
  isUploading?: boolean;
}

export function FileUpload({
  maxSize = 5 * 1024 * 1024, // 5MB
  maxFiles = 1,
  accept = {
    'application/pdf': ['.pdf'],
    // 'application/msword': ['.doc'],
    // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  },
  disabled = false,
  onFilesSelected,
  isUploading = false,
  className,
  ...props
}: FileUploadProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [_rejected, setRejected] = React.useState<File[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const onDrop = React.useCallback(
    (acceptedFiles: File[], rejectedFiles: AnyValue[]) => {
      if (acceptedFiles?.length) {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles].slice(0, maxFiles));
        setError(null);

        if (onFilesSelected) onFilesSelected(acceptedFiles);
      }

      if (rejectedFiles?.length) {
        setRejected((prevRejected) => [...prevRejected, ...rejectedFiles.map((r) => r.file)]);

        // Set error message based on rejection reason
        const rejectionReasons = rejectedFiles[0]?.errors || [];
        if (rejectionReasons.some((e: Error & { code: string }) => e.code === 'file-too-large')) {
          setError(`File is too large. Max size is ${maxSize / (1024 * 1024)}MB.`);
        } else if (
          rejectionReasons.some((e: Error & { code: string }) => e.code === 'file-invalid-type')
        ) {
          setError('Invalid file type. Please upload a PDF file.');
        } else {
          setError('File upload failed. Please try again.');
        }
      }
    },
    [maxFiles, maxSize, onFilesSelected],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    maxFiles,
    accept,
    disabled: disabled || isUploading,
  });

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const _removeRejected = (name: string) => {
    setRejected((files) => files.filter((file) => file.name !== name));
  };

  const _removeAll = () => {
    setFiles([]);
    setRejected([]);
    setError(null);
  };

  return (
    <div className={cn('', className)} {...props}>
      <div
        {...getRootProps()}
        className={cn(
          'relative flex flex-col items-center justify-center rounded-lg border-2 border-gray-300 border-dashed p-12 text-center transition-colors',
          isDragActive ? 'border-primary bg-primary/5' : 'hover:bg-gray-50 dark:hover:bg-gray-800',
          disabled || isUploading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
          error ? 'border-red-500' : '',
        )}
      >
        <input {...getInputProps()} />

        {isUploading ? (
          <div className="flex flex-col items-center justify-center text-muted-foreground/90">
            <Loader2 className="mb-2 h-10 w-10 animate-spin text-gray-400" />
            <p className="text-sm">Uploading and parsing resume...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground/90">
            <Cloud className="mb-2 h-10 w-10 text-gray-400" />
            <p className="mb-2 font-medium text-sm">Drag & drop your resume here</p>
            <p className="text-muted-foreground/90 text-xs">
              PDF (max {maxSize / (1024 * 1024)}MB)
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              disabled={disabled || isUploading}
            >
              Select File
            </Button>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}

      {/* Preview */}
      {files.length > 0 && (
        <div className="mt-4">
          <div className="font-medium text-sm">Selected file</div>
          <ul className="mt-2 divide-y divide-gray-200 rounded-md border border-gray-200">
            {files.map((file) => (
              <li
                key={file.name}
                className="flex items-center justify-between py-3 pr-4 pl-3 text-sm"
              >
                <div className="flex w-0 flex-1 items-center">
                  <File className="h-5 w-5 flex-shrink-0 text-gray-400" />
                  <span className="ml-2 w-0 flex-1 truncate">{file.name}</span>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => removeFile(file.name)}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
