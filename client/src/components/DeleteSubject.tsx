import React from "react";
import { IconButton } from "@radix-ui/themes";
import { DeleteSubjectMutation } from "../hooks/useSubjectDelete";
import { TrashIcon } from "@radix-ui/react-icons";

interface Props {
  id: number;
  mutation: DeleteSubjectMutation;
}

export const DeleteSubject = ({ id, mutation }: Props) => {
  const click = () => {
    mutation.mutate(id);
  };

  return (
    <IconButton size="1" variant="ghost">
      <TrashIcon onClick={click} />
    </IconButton>
  );
};
