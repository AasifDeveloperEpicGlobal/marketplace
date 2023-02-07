import { useState } from "react";

import { useRouter } from "next/router";

// import Message from "../../.././components/message-me/message";
import Message from "../../../components/message-me-edit/message";
import styles from "../../../styles/pages/expert-web/profile.module.scss";
import AdminLayout from "components/AdminLayout";

const EditProfile = () => {
  const router = useRouter();

  const [currentPlan, setCurrentPlan] = useState<string>("Expertise");
  const [search, setSearch] = useState<string>("");
  const [showPopup, setShowPopup] = useState(true);
  return (
    <div className={styles.container_width}>
      <AdminLayout>
        <div className={styles.adminMain}>
          <Message
            showModelValue={showPopup}
            handleState={(value) => setShowPopup(value)}
            step={2}
            title={"Company Details"}
          />
        </div>
      </AdminLayout>
    </div>
  );
};
export default EditProfile;
