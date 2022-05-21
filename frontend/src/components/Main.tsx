import ListLayout from './layout/ListLayout';

const Main = () => {
  const tableHeader = ['제목', '상태', '등록자', '등록일시'];
  return <ListLayout header="메인" tableHeader={tableHeader} />;
};

export default Main;
