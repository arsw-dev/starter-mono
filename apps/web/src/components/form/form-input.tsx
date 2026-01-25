import type { ComponentProps } from 'react';
import type { FieldValues, Path } from 'react-hook-form';

import { useFormContext } from 'react-hook-form';

import { Input } from '../ui/input';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';

type FormInputProps<T> = ComponentProps<'input'> & {
  name: Path<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  description?: string;
};

const FormInput = <TFormValues extends FieldValues>({
  name,
  label,
  required = false,
  disabled = false,
  description,
  ...props
}: FormInputProps<TFormValues>) => (
  <FormField
    control={useFormContext<TFormValues>().control}
    name={name}
    disabled={disabled}
    render={({ field }) => (
      <FormItem>
        {label && (
          <FormLabel>
            {label}
            {' '}
            {required && <span className="text-red-500">*</span>}
          </FormLabel>
        )}
        <FormControl>
          <Input
            aria-required={required}
            {...props}
            {...field}
            onBlur={(e) => {
              field.onBlur();
              field.onChange(e.target.value.trim());
            }}
          />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormInput;
