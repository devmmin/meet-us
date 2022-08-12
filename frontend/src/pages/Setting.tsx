import ListLayout from "../layouts/Admin/ListLayout";
import { getHeader } from "../util";

const {
  data: { header },
} = getHeader();

const Setting = () => <ListLayout title="설정" tableHeader={header} />;

export default Setting;
