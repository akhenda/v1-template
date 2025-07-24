'use client';

import React from 'react';
import { type FieldPath, type FieldValues, useFormContext } from 'react-hook-form';

// Import base field components
import { CheckboxFieldComponent, type CheckboxFieldProps } from './fields/checkbox-field';
import {
  CountryDropdownFieldComponent,
  type CountryDropdownFieldProps,
} from './fields/country-dropdown-field';
import { DatePickerFieldComponent, type DatePickerFieldProps } from './fields/date-picker-field';
import {
  MultiCheckboxFieldComponent,
  type MultiCheckboxFieldProps,
} from './fields/multi-checkbox-field';
import { PhoneInputFieldComponent, type PhoneInputFieldProps } from './fields/phone-input-field';
import { PlateEditorFieldComponent, type PlateEditorFieldProps } from './fields/plate-editor-field';
import {
  PlateEditorFieldMDComponent,
  type PlateEditorFieldMDProps,
} from './fields/plate-editor-field-md';
import { RadioGroupFieldComponent, type RadioGroupFieldProps } from './fields/radio-group-field';
import { SelectFieldComponent, type SelectFieldProps } from './fields/select-field';
import { SwitchFieldComponent, type SwitchFieldProps } from './fields/switch-field';
import { TagInputFieldComponent, type TagInputFieldProps } from './fields/tag-input-field';
import { TextAreaFieldComponent, type TextAreaFieldProps } from './fields/text-area-field';
import { TextInputFieldComponent, type TextInputFieldProps } from './fields/text-input-field';

/**
 * Creates a set of form field components (e.g., TextInputField, DatePickerField)
 * that are strictly typed for a specific form schema.
 *
 * Use this in your parent component that defines the form's schema (e.g., AwardSectionComponent).
 *
 * @template TFieldValues The schema type of your form (e.g., `Resume`).
 * @returns An object containing typed versions of your form field components.
 */
export function createTypedFormFields<TFieldValues extends FieldValues>() {
  // Get the RHF context *within this closure*, binding it to TFieldValues
  // This hook must be called inside a React component's render or another hook
  // which is why this factory function should be called within a component or useMemo.
  const useTypedFormContext = () => useFormContext<TFieldValues>();

  // Now, let's create the typed versions of our field components
  // These components will automatically get 'control' from the context
  // and have their 'name' prop strictly typed.

  // CheckboxField for this specific TFieldValues
  const TypedCheckboxField = React.memo(
    (
      props: Omit<CheckboxFieldProps<TFieldValues>, 'control'> & { name: FieldPath<TFieldValues> },
    ) => {
      const { control } = useTypedFormContext(); // Get the control typed as TFieldValues
      return <CheckboxFieldComponent control={control} {...props} />;
    },
  );
  TypedCheckboxField.displayName = 'TypedCheckboxField'; // For React DevTools

  // CountryDropdownField for this specific TFieldValues
  const TypedCountryDropdownField = React.memo(
    (
      props: Omit<CountryDropdownFieldProps<TFieldValues>, 'control'> & {
        name: FieldPath<TFieldValues>;
      },
    ) => {
      const { control } = useTypedFormContext(); // Get the control typed as TFieldValues
      return <CountryDropdownFieldComponent control={control} {...props} />;
    },
  );
  TypedCountryDropdownField.displayName = 'TypedCountryDropdownField'; // For React DevTools

  // DatePickerField for this specific TFieldValues
  const TypedDatePickerField = React.memo(
    (
      props: Omit<DatePickerFieldProps<TFieldValues>, 'control'> & {
        name: FieldPath<TFieldValues>;
      },
    ) => {
      const { control } = useTypedFormContext(); // Get the control typed as TFieldValues
      return <DatePickerFieldComponent control={control} {...props} />;
    },
  );
  TypedDatePickerField.displayName = 'TypedDatePickerField'; // For React DevTools

  // MultiCheckboxField for this specific TFieldValues
  const TypedMultiCheckboxField = React.memo(
    (
      props: Omit<MultiCheckboxFieldProps<TFieldValues>, 'control'> & {
        name: FieldPath<TFieldValues>;
      },
    ) => {
      const { control } = useTypedFormContext(); // Get the control typed as TFieldValues
      return <MultiCheckboxFieldComponent control={control} {...props} />;
    },
  );
  TypedMultiCheckboxField.displayName = 'TypedMultiCheckboxField'; // For React DevTools

  // PhoneInputField for this specific TFieldValues
  const TypedPhoneInputField = React.memo(
    (
      props: Omit<PhoneInputFieldProps<TFieldValues>, 'control'> & {
        name: FieldPath<TFieldValues>;
      },
    ) => {
      const { control } = useTypedFormContext(); // Get the control typed as TFieldValues
      return <PhoneInputFieldComponent control={control} {...props} />;
    },
  );
  TypedPhoneInputField.displayName = 'TypedPhoneInputField'; // For React DevTools

  // PlateEditorFieldMD for this specific TFieldValues
  const TypedPlateEditorFieldMD = React.memo(
    (
      props: Omit<PlateEditorFieldMDProps<TFieldValues>, 'control'> & {
        name: FieldPath<TFieldValues>;
      },
    ) => {
      const { control } = useTypedFormContext(); // Get the control typed as TFieldValues
      return <PlateEditorFieldMDComponent control={control} {...props} />;
    },
  );
  TypedPlateEditorFieldMD.displayName = 'TypedPlateEditorFieldMD'; // For React DevTools

  // PlateEditorField for this specific TFieldValues
  const TypedPlateEditorField = React.memo(
    (
      props: Omit<PlateEditorFieldProps<TFieldValues>, 'control'> & {
        name: FieldPath<TFieldValues>;
      },
    ) => {
      const { control } = useTypedFormContext(); // Get the control typed as TFieldValues
      return <PlateEditorFieldComponent control={control} {...props} />;
    },
  );
  TypedPlateEditorField.displayName = 'TypedPlateEditorField'; // For React DevTools

  // RadioGroupField for this specific TFieldValues
  const TypedRadioGroupField = React.memo(
    (
      props: Omit<RadioGroupFieldProps<TFieldValues>, 'control'> & {
        name: FieldPath<TFieldValues>;
      },
    ) => {
      const { control } = useTypedFormContext(); // Get the control typed as TFieldValues
      return <RadioGroupFieldComponent control={control} {...props} />;
    },
  );
  TypedRadioGroupField.displayName = 'TypedRadioGroupField'; // For React DevTools

  // SelectField for this specific TFieldValues
  const TypedSelectField = React.memo(
    (
      props: Omit<SelectFieldProps<TFieldValues>, 'control'> & { name: FieldPath<TFieldValues> },
    ) => {
      const { control } = useTypedFormContext(); // Get the control typed as TFieldValues
      return <SelectFieldComponent control={control} {...props} />;
    },
  );
  TypedSelectField.displayName = 'TypedSelectField'; // For React DevTools

  // SwitchField for this specific TFieldValues
  const TypedSwitchField = React.memo(
    (
      props: Omit<SwitchFieldProps<TFieldValues>, 'control'> & { name: FieldPath<TFieldValues> },
    ) => {
      const { control } = useTypedFormContext(); // Get the control typed as TFieldValues
      return <SwitchFieldComponent control={control} {...props} />;
    },
  );
  TypedSwitchField.displayName = 'TypedSwitchField'; // For React DevTools

  // TagInputField for this specific TFieldValues
  const TypedTagInputField = React.memo(
    (
      props: Omit<TagInputFieldProps<TFieldValues>, 'control'> & { name: FieldPath<TFieldValues> },
    ) => {
      const { control } = useTypedFormContext(); // Get the control typed as TFieldValues
      return <TagInputFieldComponent control={control} {...props} />;
    },
  );
  TypedTagInputField.displayName = 'TypedTagInputField'; // For React DevTools

  // TextAreaField for this specific TFieldValues
  const TypedTextAreaField = React.memo(
    (
      props: Omit<TextAreaFieldProps<TFieldValues>, 'control'> & { name: FieldPath<TFieldValues> },
    ) => {
      const { control } = useTypedFormContext(); // Get the control typed as TFieldValues
      return <TextAreaFieldComponent control={control} {...props} />;
    },
  );
  TypedTextAreaField.displayName = 'TypedTextAreaField'; // For React DevTools

  // TextEditorField for this specific TFieldValues
  const TypedTextEditorField = React.memo(
    (
      props:
        | (Omit<TextAreaFieldProps<TFieldValues>, 'control'> & {
            name: FieldPath<TFieldValues>;
            type: 'simple';
          })
        | (Omit<PlateEditorFieldProps<TFieldValues>, 'control'> & {
            name: FieldPath<TFieldValues>;
            type: 'plate';
          })
        | (Omit<PlateEditorFieldMDProps<TFieldValues>, 'control'> & {
            name: FieldPath<TFieldValues>;
            type: 'plate-md';
          }),
    ) => {
      const { control } = useTypedFormContext(); // Get the control typed as TFieldValues

      switch (props.type) {
        case 'plate': {
          const { type, ...rest } = props;

          return <PlateEditorFieldComponent control={control} {...rest} />;
        }

        case 'plate-md': {
          const { type, ...rest } = props;

          return <PlateEditorFieldMDComponent control={control} {...rest} />;
        }

        default: {
          const { type, ...rest } = props;

          return <TextAreaFieldComponent control={control} {...rest} />;
        }
      }
    },
  );
  TypedTextEditorField.displayName = 'TypedTextEditorField'; // For React DevTools

  // TextInputField for this specific TFieldValues
  const TypedTextInputField = React.memo(
    (
      props: Omit<TextInputFieldProps<TFieldValues>, 'control'> & {
        name: FieldPath<TFieldValues>; // The strict type for 'name'
      },
    ) => {
      const { control } = useTypedFormContext(); // Get the control typed as TFieldValues

      return <TextInputFieldComponent control={control} {...props} />;
    },
  );
  TypedTextInputField.displayName = 'TypedTextInputField'; // For React DevTools

  return {
    CheckboxField: TypedCheckboxField,
    CountryDropdownField: TypedCountryDropdownField,
    DatePickerField: TypedDatePickerField,
    MultiCheckboxField: TypedMultiCheckboxField,
    PhoneInputField: TypedPhoneInputField,
    PlateEditorFieldMD: TypedPlateEditorFieldMD,
    PlateEditorField: TypedPlateEditorField,
    RadioGroupField: TypedRadioGroupField,
    SelectField: TypedSelectField,
    SwitchField: TypedSwitchField,
    TagInputField: TypedTagInputField,
    TextAreaField: TypedTextAreaField,
    TextEditorField: TypedTextEditorField,
    TextInputField: TypedTextInputField,
  };
}
