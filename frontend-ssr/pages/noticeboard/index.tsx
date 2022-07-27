import { DefaultLayout } from '@components/DefaultLayout';
import { Header } from '@components/Header';
import Link from 'next/link';

const NoticeBoardPage = () => (
  <DefaultLayout title="Meet us - 공지사항">
    <Header />
    <h2>
      <Link href="/">
        <a>Back to home</a>
      </Link>
    </h2>
  </DefaultLayout>
);

export default NoticeBoardPage;
