import ListLayout from './Layout/ListLayout';

const Setting = () => {
  const tableHeader = ['제목', '상태', '등록자', '등록일시'];
  return <ListLayout header="설정" tableHeader={tableHeader} />;
};

export default Setting;
