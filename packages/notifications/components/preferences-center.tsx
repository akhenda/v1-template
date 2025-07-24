// import type { PreferenceSet, SetPreferencesProperties } from '@knocklabs/client';
// import { useKnockClient } from '@knocklabs/react';
// import { useEffect, useState } from 'react';

// import type { AnyValue } from '@repo/types';

// // Here we create a view config object, this helps us customize the interface
// // and choose which preference options we want to display to the user
// const PreferenceViewConfig: Record<string, AnyValue> = {
//   RowSettings: {
//     'resume-updates': {
//       title: 'Resume Updates',
//       description: 'Resume is updated or improved',
//     },
//     'product-updates': {
//       title: 'Product Updates',
//       description: 'Stay informed about new features and improvements to ResumeMoto',
//     },
//     'security-alerts': {
//       title: 'Security Alerts',
//       description: 'Get notified about important security events related to your account',
//     },
//   },
//   ChannelTypeLabels: { in_app_feed: 'In-app Feed', email: 'Email' },
// };

// type PreferenceSettingsRowProps = {
//   preferenceType: string;
//   preferenceKey: string;
//   channelTypeSettings: Record<string, boolean>;
//   onChange: (args: {
//     preferenceKey: string;
//     preferenceType: string;
//     channelTypeSettings: Record<string, boolean>;
//   }) => void;
// };
// // The PreferenceSettingsRow component is what actually displays the UI to manipulate
// function PreferenceSettingsRow({
//   preferenceType,
//   preferenceKey,
//   channelTypeSettings,
//   onChange,
// }: PreferenceSettingsRowProps) {
//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         padding: '.75rem .25rem',
//         gap: '1rem',
//       }}
//     >
//       <div>
//         <h2>{PreferenceViewConfig.RowSettings[preferenceKey].title}</h2>
//         <p>{PreferenceViewConfig.RowSettings[preferenceKey].description}</p>
//       </div>
//       <div>
//         {Object.keys(PreferenceViewConfig.ChannelTypeLabels).map((channelType) => {
//           return (
//             <div
//               key={`${preferenceKey}_${channelType}`}
//               style={{ display: 'flex', justifyContent: 'space-between' }}
//             >
//               <label htmlFor={`${preferenceKey}_${channelType}`}>
//                 {PreferenceViewConfig.ChannelTypeLabels[channelType]}
//               </label>
//               <input
//                 id={`${preferenceKey}_${channelType}`}
//                 type="checkbox"
//                 checked={channelTypeSettings[channelType]}
//                 disabled={typeof channelTypeSettings[channelType] === 'undefined'}
//                 onChange={(e) => {
//                   onChange({
//                     preferenceKey,
//                     preferenceType,
//                     channelTypeSettings: {
//                       ...channelTypeSettings,
//                       [channelType]: e.target.checked,
//                     },
//                   });
//                 }}
//               />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default function PreferenceCenter() {
//   const knockClient = useKnockClient();

//   // Create some local state to store the user's preferences
//   const [localPreferences, setLocalPreferences] = useState<PreferenceSet>({
//     id: 'default',
//     categories: {
//       'security-alerts': { channel_types: { email: true, in_app_feed: true } },
//       'resume-updates': { channel_types: { email: false, in_app_feed: true } },
//     },
//     workflows: { 'product-updates': { channel_types: { email: true } } },
//     channel_types: {},
//   });

//   // We load the current user's preferences from Knock, and set them to local preferences

//   useEffect(() => {
//     async function fetchPreferences() {
//       const preferences = await knockClient.user.getPreferences();

//       setLocalPreferences(preferences);
//     }
//     fetchPreferences();
//   }, [knockClient]);

//   //When a preference setting is changed, we create a new PreferenceSet that
//   //includes the change, update the preferences in Knock, and then update local state
//   const onPreferenceChange = async ({
//     preferenceKey,
//     preferenceType,
//     channelTypeSettings,
//   }: {
//     preferenceKey: string;
//     preferenceType: string;
//     channelTypeSettings: Record<string, boolean>;
//   }) => {
//     //create a new preference set with local preferences as starting point
//     const preferenceUpdate = { ...localPreferences } satisfies SetPreferencesProperties;

//     // Here we'll make updates to the preference set based on the preferenceType
//     // and override existing channelTypeSettings
//     // since Workflow and Category preferences can also be a Boolean,
//     // we'll check if the preferenceKey contains an channel_types object
//     if (
//       preferenceType === 'category' &&
//       typeof preferenceUpdate.categories?.[preferenceKey] === 'object'
//     ) {
//       preferenceUpdate.categories[preferenceKey].channel_types = channelTypeSettings;
//     }

//     if (
//       preferenceType === 'workflow' &&
//       typeof preferenceUpdate.workflows?.[preferenceKey] === 'object'
//     ) {
//       preferenceUpdate.workflows[preferenceKey].channel_types = channelTypeSettings;
//     }

//     //Next, we upload the new PreferenceSet to Knock for that user
//     const preferences = await knockClient.user.setPreferences(preferenceUpdate);

//     // Set the updated preferences in local state
//     setLocalPreferences(preferences);
//   };

//   if (!localPreferences) return null;

//   return (
//     <div className="preferences">
//       {Object.keys(localPreferences?.categories).map((category) => {
//         return (
//           <PreferenceSettingsRow
//             key={category}
//             preferenceType="category"
//             preferenceKey={category}
//             channelTypeSettings={
//               typeof localPreferences.categories[category] === 'object'
//                 ? localPreferences?.categories[category]?.channel_types
//                 : {}
//             }
//             onChange={onPreferenceChange}
//           />
//         );
//       })}
//       {Object.keys(localPreferences?.workflows).map((workflow) => {
//         return (
//           <PreferenceSettingsRow
//             key={workflow}
//             preferenceType="workflow"
//             preferenceKey={workflow}
//             channelTypeSettings={
//               typeof localPreferences?.workflows[workflow] === 'object'
//                 ? localPreferences?.workflows[workflow]?.channel_types
//                 : {}
//             }
//             onChange={onPreferenceChange}
//           />
//         );
//       })}
//     </div>
//   );
// }
