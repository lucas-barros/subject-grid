import * as React from "react";
import * as Toast from "@radix-ui/react-toast";
import "./styles.css";
import { Card, Flex, Text } from "@radix-ui/themes";
import { RocketIcon } from "@radix-ui/react-icons";

interface Props {
  open: boolean;
  message: string;
  setOpen: (open: boolean) => void;
}

export const Notification = ({ open, message, setOpen }: Props) => {
  return (
    <>
      <Toast.Root
        className="root"
        open={open}
        onOpenChange={setOpen}
        duration={3000}
      >
        <Card>
          <Flex gap="1" align="center">
            <RocketIcon />
            <Text size="2" weight="medium">
              {message}
            </Text>
          </Flex>
        </Card>
      </Toast.Root>
      <Toast.Viewport className="viewport" />
    </>
  );
};
