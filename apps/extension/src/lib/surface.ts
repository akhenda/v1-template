import type { AnyValue } from '@repo/types';

export type Surface = 'popup' | 'sidepanel' | 'options' | 'devtools' | 'unknown';

export function detectSurface(manifest = chrome.runtime.getManifest() as AnyValue): Surface {
  // Strip query/hash to compare against manifest URLs
  const here = location.href.split('#')[0]?.split('?')[0];
  const toURL = (p?: string) => (p ? chrome.runtime.getURL(p) : undefined);

  if (!here || here === 'about:blank') return 'unknown';

  // 1) Check manifest-configured paths first (most accurate):
  const popupURL = toURL(manifest.action?.default_popup); // action.default_popup
  if (popupURL && here.startsWith(popupURL)) return 'popup';

  const sidepanelURL = toURL(manifest.side_panel?.default_path); // side_panel.default_path
  if (sidepanelURL && here.startsWith(sidepanelURL)) return 'sidepanel';

  // 2) Fallback to well-known output filenames that WXT generates:
  if (here.endsWith('/popup.html') || here.endsWith('popup.html')) return 'popup';
  if (here.endsWith('/sidepanel.html') || here.endsWith('sidepanel.html')) return 'sidepanel';
  if (here.endsWith('/options.html') || here.endsWith('options.html')) return 'options';
  if (here.endsWith('/devtools.html') || here.endsWith('devtools.html')) return 'devtools';

  return 'unknown';
}
