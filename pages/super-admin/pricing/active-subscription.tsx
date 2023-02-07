import SuperAdminLayout from "components/SuperAdmin/Layout";
import ActiveSubscriptions from "components/SuperAdmin/Tab/Pricing/subscription/activeSubscription";

import React from "react";

const ActiveSubscription = () => {
  return (
    <div>
      <SuperAdminLayout>
        <ActiveSubscriptions setSubTab={""} setCurrentId={""} />
      </SuperAdminLayout>
    </div>
  );
};

export default ActiveSubscription;
