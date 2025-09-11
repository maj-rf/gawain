'use client'; // Error boundaries must be Client Components

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      {error.message}
    </div>
  );
}
