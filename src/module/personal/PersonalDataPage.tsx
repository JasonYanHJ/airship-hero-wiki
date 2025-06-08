import { PageContainer } from "@ant-design/pro-components";
import RateDataCard from "./hero-rate/RateDataCard";
import MigrationModal from "./MigrationModal";

const PersonalDataPage = () => {
  return (
    <PageContainer extra={<MigrationModal />}>
      <RateDataCard />
    </PageContainer>
  );
};

export default PersonalDataPage;
