import UserL from "@semcore/icon/User/l";
import RobotL from "@semcore/icon/Robot/l";
import { Flex } from "@semcore/flex-box";

export const Avatar = ({ name }: { name?: string }) => {
  const isRobot = name ? /[0-9]/.test(name) : false;
  return (
    <Flex w="100%" h={70} justifyContent="center" alignItems="center">
      {isRobot ? <RobotL w="100%" h="100%" /> : <UserL w="100%" h="100%" />}
    </Flex>
  );
};
