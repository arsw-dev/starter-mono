import z from 'zod';

type ZStringType = {
  type: 'required' | 'optional' | 'nullable';
  min?: number;
  max?: number;
  fieldName?: string;
};

const zString = ({ type, max, min, fieldName }: ZStringType) => {
  let schema = z.string().trim();

  if (min !== undefined) {
    schema = schema.min(
      min,
      `${fieldName ?? 'Field'} needs to be at least ${min} character(s).`,
    );
  }

  if (max !== undefined) {
    schema = schema.max(
      max,
      `${fieldName ?? 'Field'} can be at max ${max} characters.`,
    );
  }

  switch (type) {
    case 'required':
      return schema.min(1, `${fieldName ?? 'Field'} is required`);

    case 'optional':
      return schema
        .transform(v => (v === '' ? undefined : v))
        .optional();

    case 'nullable':
      return schema
        .transform(v => (v === '' ? null : v))
        .nullable();

    default: {
      // Exhaustiveness guard
      const _exhaustive: never = type;
      return _exhaustive;
    }
  }
};

export { zString };
