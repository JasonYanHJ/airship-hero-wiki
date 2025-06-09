import { PageContainer } from "@ant-design/pro-components";
import RateDataCard from "./hero-rate/RateDataCard";
import MigrationModal from "./MigrationModal";
import RateDataModalForm from "./hero-rate/RateDataModalForm";

const PersonalDataPage = () => {
  return (
    <PageContainer
      extra={[
        <MigrationModal key="migration" />,
        <RateDataModalForm key="rate-input" />,
      ]}
    >
      <RateDataCard />
    </PageContainer>
  );
};

export default PersonalDataPage;
