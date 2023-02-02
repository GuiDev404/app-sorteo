import Error from './Error';

export default function Input({
  register,
  validation = {},
  errors,
  name,
  className = '',
  ...rest
}) {
  return (
    <div>
      <label htmlFor={name} className='font-bold mb-1 inline-block'>
        {rest.label}
      </label>
      <input
        id={name}
        type={rest.type || 'text'}
        {...register(name, validation)}
        {...rest}
        className={`bg-neutral-800 w-full border border-neutral-700  p-4 block  rounded-md ${className}`}
      />
      {errors?.[name] && <Error message={errors?.[name].message} />}
    </div>
  );
}
