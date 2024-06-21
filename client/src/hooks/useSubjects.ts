import { useQuery } from "@tanstack/react-query";
import { config } from "../config";
import { serverApi } from "../api";
import { Subject } from "../types/subject";
import { AxiosError } from "axios";

type Pagination = {
  skip: number;
  take: number;
};

type Filter = {
  name?: string;
  sex?: string;
  status?: string;
  diagnosisDate?: string;
};

export const useSubjects = (filter?: Filter, pagination?: Pagination) => {
  const query = useQuery<
    Subject[],
    AxiosError<{ error: string }>,
    Subject[],
    [string, { filter?: Filter; pagination?: Pagination }]
  >({
    queryKey: ["subjects", { filter, pagination }],
    queryFn: async ({ queryKey }) => {
      const [, { filter, pagination }] = queryKey;

      const params = new URLSearchParams({
        ...filter,
        ...{
          ...(pagination?.skip ? { skip: pagination.skip.toString() } : {}),
          ...(pagination?.take ? { skip: pagination.take.toString() } : {}),
        },
      }).toString();

      const response = await serverApi.get<Subject[]>(
        `${config.serverHost}/subjects?${params}`
      );
      return response.data;
    },
  });

  return query;
};
