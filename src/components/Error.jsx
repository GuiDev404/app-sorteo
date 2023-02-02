export default function Error({ message }) {
  return (
    <span className='text-red-500 text-sm mt-2' role='alert'>
      {message}
    </span>
  );
}
