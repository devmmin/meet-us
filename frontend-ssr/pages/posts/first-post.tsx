import { DefaultLayout } from '@components/DefaultLayout';
import Link from 'next/link';

export default function FirstPost() {
  return (
    <DefaultLayout title="ddsdsd">
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </DefaultLayout>
  );
}
