import ListLayout from '../layouts/Admin/ListLayout';

const Setting = () => {
  const tableHeader = [
    'CHECKBOX',
    '제목',
    '상태',
    '등록자',
    '등록/최근 수정 일시',
    'MORE',
  ];
  return <ListLayout title="설정" tableHeader={tableHeader} />;
};

export default Setting;
