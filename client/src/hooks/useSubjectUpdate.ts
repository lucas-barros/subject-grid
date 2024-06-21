import { AxiosError } from "axios";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { config } from "../config";
import { serverApi } from "../api";
import { Subject } from "../types/subject";

export type UpdateSubjectMutation = UseMutationResult<
  Subject,
  AxiosError<{ error: string }>,
  Subject
>;

export const useSubjectUpdate = (notification: (message: string) => void) => {
  const queryClient = useQueryClient();

  return useMutation<Subject, AxiosError<{ error: string }>, Subject>({
    mutationFn: ({ id, ...payload }) => {
      return serverApi.put(`${config.serverHost}/subjects/${id}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      notification("Subject updated");
    },
  });
};
