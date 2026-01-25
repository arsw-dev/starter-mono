import type { ComponentProps } from 'react';
import type { FieldValues, Path } from 'react-hook-form';

import { useFormContext } from 'react-hook-form';

import { cn } from '@/utils/cn';

import { Textarea } from '../ui/textarea';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form';

type FormTextareaProps<T> = ComponentProps<'textarea'> & {
  name: Path<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  description?: string;
  className?: string;
};

const FormTextarea = <TFormValues extends FieldValues>({
  name,
  label,
  required,
  disabled,
  className,
  description,
  ...props
}: FormTextareaProps<TFormValues>) => (
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
          <Textarea
            className={cn('resize-none', className)}
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

export default FormTextarea;
