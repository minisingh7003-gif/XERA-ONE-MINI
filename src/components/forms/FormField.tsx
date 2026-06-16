import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { useFormContext, Controller, type RegisterOptions } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// ============================================
// Form Components
// ============================================

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(7)}`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-3 bg-neutral-900 border rounded-lg text-neutral-100
            placeholder:text-neutral-500
            focus:outline-none transition-colors
            ${error ? 'border-error-500 focus:border-error-500 focus:ring-1 focus:ring-error-500' : 'border-neutral-700 focus:border-primary-500 focus:ring-1 focus:ring-primary-500'}
            ${className}
          `}
          {...props}
        />
        {error && <p className="form-error">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-neutral-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Textarea component
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substring(7)}`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="label">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`
            w-full px-4 py-3 bg-neutral-900 border rounded-lg text-neutral-100
            placeholder:text-neutral-500 resize-y min-h-[120px]
            focus:outline-none transition-colors
            ${error ? 'border-error-500 focus:border-error-500 focus:ring-1 focus:ring-error-500' : 'border-neutral-700 focus:border-primary-500 focus:ring-1 focus:ring-primary-500'}
            ${className}
          `}
          {...props}
        />
        {error && <p className="form-error">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-neutral-500">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// Select component
interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = '', id, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substring(7)}`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="label">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`
            w-full px-4 py-3 bg-neutral-900 border rounded-lg text-neutral-100
            focus:outline-none transition-colors appearance-none
            bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")]
            bg-no-repeat bg-right-3
            ${error ? 'border-error-500 focus:border-error-500 focus:ring-1 focus:ring-error-500' : 'border-neutral-700 focus:border-primary-500 focus:ring-1 focus:ring-primary-500'}
            ${className}
          `}
          style={{ backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="form-error">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

// Checkbox component
interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substring(7)}`;

    return (
      <div className="w-full">
        <label htmlFor={checkboxId} className={`flex items-center gap-3 cursor-pointer ${className}`}>
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className="
              w-5 h-5 rounded border-2 border-neutral-700 bg-neutral-900
              checked:bg-primary-500 checked:border-primary-500
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-950
              transition-colors cursor-pointer
            "
            {...props}
          />
          <span className="text-sm text-neutral-300">{label}</span>
        </label>
        {error && <p className="form-error ml-8">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

// ============================================
// React Hook Form Integration
// ============================================

interface FormFieldProps {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox';
  placeholder?: string;
  helperText?: string;
  options?: { value: string; label: string }[];
  rules?: RegisterOptions;
  className?: string;
}

export function FormField({
  name,
  label,
  type = 'text',
  placeholder,
  helperText,
  options,
  rules,
  className = '',
}: FormFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        switch (type) {
          case 'textarea':
            return (
              <Textarea
                {...field}
                label={label}
                placeholder={placeholder}
                error={error?.message}
                helperText={helperText}
                className={className}
              />
            );
          case 'select':
            return (
              <Select
                {...field}
                label={label}
                options={options || []}
                placeholder={placeholder}
                error={error?.message}
                className={className}
              />
            );
          case 'checkbox':
            return (
              <Checkbox
                {...field}
                label={label || ''}
                error={error?.message}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                className={className}
              />
            );
          default:
            return (
              <Input
                {...field}
                type={type}
                label={label}
                placeholder={placeholder}
                error={error?.message}
                helperText={helperText}
                className={className}
              />
            );
        }
      }}
    />
  );
}

// ============================================
// Common Validation Schemas
// ============================================

export const commonSchemas = {
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Please enter a valid phone number'),
  url: z.string().url('Please enter a valid URL'),
  required: z.string().min(1, 'This field is required'),
};

// Contact form schema
export const contactFormSchema = z.object({
  name: commonSchemas.name,
  email: commonSchemas.email,
  subject: commonSchemas.required,
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Newsletter form schema
export const newsletterFormSchema = z.object({
  email: commonSchemas.email,
});

// Login form schema
export const loginFormSchema = z.object({
  email: commonSchemas.email,
  password: commonSchemas.password,
});

// Registration form schema
export const registerFormSchema = z.object({
  name: commonSchemas.name,
  email: commonSchemas.email,
  password: commonSchemas.password,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterFormData = z.infer<typeof newsletterFormSchema>;
export type LoginFormData = z.infer<typeof loginFormSchema>;
export type RegisterFormData = z.infer<typeof registerFormSchema>;

export { zodResolver };
