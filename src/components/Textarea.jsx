import Error from './Error';

export default function Textarea({
  register,
  name,
  validation = {},
  errors,
  className = '',
  ...rest
} = {}) {
  return (
    <div>
      <label htmlFor={name} className='font-bold mb-1 inline-block'>
        {rest.label}
      </label>
      <textarea
        id={name}
        className={`p-3 border border-neutral-700 rounded-md bg-neutral-800 w-full max-h-40 min-h-40 h-40 resize-none ${className}`}
        {...register('participantes', validation)}
        {...rest}
      ></textarea>
      {errors[name] && <Error message={errors[name].message} />}
    </div>
  );
}
