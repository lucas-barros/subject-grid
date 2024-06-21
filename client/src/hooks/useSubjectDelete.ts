import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { config } from "../config";
import { serverApi } from "../api";
import { AxiosError } from "axios";

export type DeleteSubjectMutation = UseMutationResult<
  void,
  AxiosError<{ error: string }>,
  number
>;

export const useSubjectDelete = (notification: (message: string) => void) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ error: string }>, number>({
    mutationFn: (id) => {
      return serverApi.delete(`${config.serverHost}/subjects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      notification("Subject deleted");
    },
  });
};
