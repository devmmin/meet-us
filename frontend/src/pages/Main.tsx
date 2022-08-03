import ListLayout from "../layouts/Admin/ListLayout";
import { getHeader } from "../util";

const {
  data: { header },
} = getHeader();

const Main = () => <ListLayout title="메인" tableHeader={header} />;

export default Main;
