import { Center, Col, CustomText } from '@/components';
import { useSession } from '@/contexts/auth';
import React from 'react';

const Profile = () => {
  const { endSession } = useSession();
  return (
    <Col style={{ flex: 1 }} centered>
      <CustomText>Profile page</CustomText>
      <CustomText onPress={endSession}>Log out</CustomText>
    </Col>
  );
};

export default Profile;
