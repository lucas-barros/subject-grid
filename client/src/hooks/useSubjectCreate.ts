import { AxiosError } from "axios";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { config } from "../config";
import { serverApi } from "../api";
import { Subject, SubjectForm } from "../types/subject";

export type CreateSubjectMutation = UseMutationResult<
  Subject,
  AxiosError<{ error: string }>,
  SubjectForm
>;

export const useSubjectCreate = (notification: (message: string) => void) => {
  const queryClient = useQueryClient();

  return useMutation<Subject, AxiosError<{ error: string }>, SubjectForm>({
    mutationFn: (subject) => {
      return serverApi.post(`${config.serverHost}/subjects`, subject);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      notification("Subject created");
    },
  });
};
