import ListLayout from "../layouts/Admin/ListLayout";
import { getHeader } from "../util";

const {
  data: { header },
} = getHeader();

const UserManagement = () => (
  <ListLayout title="유저 관리" tableHeader={header} />
);

export default UserManagement;
