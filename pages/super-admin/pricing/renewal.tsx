import SuperAdminLayout from 'components/SuperAdmin/Layout'
import SubscriptionDataList from 'components/SuperAdmin/Tab/Pricing/subscription'
import React from 'react'

const RenewalSubcription = () => {
  return (
    <div>
      <SuperAdminLayout>
    <SubscriptionDataList setSubTab={""} setCurrentId={""}/>
    </SuperAdminLayout>
    </div>
  )
}

export default RenewalSubcription