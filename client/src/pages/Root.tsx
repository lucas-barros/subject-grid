import React, { useState } from "react";
import { Box, Grid } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useSubjectCreate } from "../hooks/useSubjectCreate.ts";
import { CreateSubject } from "../components/CreateSubject.tsx";
import { useSubjects } from "../hooks/useSubjects.ts";
import { Notification } from "../components/notification/Notification.tsx";
import { useSubjectUpdate } from "../hooks/useSubjectUpdate.ts";
import { useSubjectDelete } from "../hooks/useSubjectDelete.ts";
import { Filter } from "../components/Filters.tsx";
import { SubjectForm } from "../types/subject.ts";
import { SubjectsTable } from "../components/SubjectsTable.tsx";

const isFilterActive = (filters: SubjectForm) => {
  return Object.values(filters).some(Boolean);
};

const initialFilters = {
  name: "",
  sex: "",
  diagnosisDate: "",
  status: "",
};
export const Root = () => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<SubjectForm>(initialFilters);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const { data: subjects = [] } = useSubjects(filters);
  const mutation = useSubjectCreate((message) => {
    setOpen(true);
    setMessage(message);
  });
  const updateMutation = useSubjectUpdate((message) => {
    setOpen(true);
    setMessage(message);
  });
  const deleteMutation = useSubjectDelete((message) => {
    setOpen(true);
    setMessage(message);
  });

  return (
    <Grid columns="2" gap="3" width="auto" height="100vh">
      <Box p="4">
        <CreateSubject mutation={mutation} />
      </Box>
      <Box p="4">
        <Box mt="1">
          <Filter
            onCancel={() => {
              setFilters(initialFilters);
            }}
            filters={filters}
            onFilter={(filters) => {
              queryClient.invalidateQueries({ queryKey: ["subjects"] });
              setFilters(filters);
            }}
          />
        </Box>
        <SubjectsTable
          subjects={subjects}
          isFilterActive={isFilterActive(filters)}
          updateMutation={updateMutation}
          deleteMutation={deleteMutation}
        />
        <Notification open={open} message={message} setOpen={setOpen} />
      </Box>
    </Grid>
  );
};
