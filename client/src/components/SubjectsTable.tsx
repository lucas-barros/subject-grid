import React from "react";
import { format, parseISO } from "date-fns";
import { Box, Callout, Flex, ScrollArea, Table } from "@radix-ui/themes";
import { EditSubject } from "../components/EditSubject.tsx";
import { DeleteSubject } from "../components/DeleteSubject.tsx";
import { UpdateSubjectMutation } from "../hooks/useSubjectUpdate.ts";
import { DeleteSubjectMutation } from "../hooks/useSubjectDelete.ts";
import { Subject } from "../types/subject.ts";

interface Props {
  subjects: Subject[];
  isFilterActive: boolean;
  updateMutation: UpdateSubjectMutation;
  deleteMutation: DeleteSubjectMutation;
}

export const SubjectsTable = ({
  subjects,
  isFilterActive,
  deleteMutation,
  updateMutation,
}: Props) => {
  return (
    <ScrollArea
      type="auto"
      scrollbars="vertical"
      style={{ height: "400px", borderRadius: "7px" }}
    >
      {subjects?.length > 0 ? (
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell />
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Sex</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Diagnosis date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {subjects.map(({ id, name, diagnosisDate, sex, status }) => (
              <Table.Row key={id}>
                <Table.Cell>
                  <Flex height="100%" align="center" justify="center">
                    <EditSubject
                      mutation={updateMutation}
                      subject={{
                        id,
                        name,
                        diagnosisDate: format(
                          parseISO(diagnosisDate),
                          "yyyy-MM-dd'T'HH:mm"
                        ),
                        sex,
                        status,
                      }}
                    />
                  </Flex>
                </Table.Cell>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{sex}</Table.Cell>
                <Table.Cell>{status}</Table.Cell>
                <Table.Cell>
                  {new Date(diagnosisDate).toDateString()}
                </Table.Cell>
                <Table.Cell>
                  <Flex height="100%" align="center" justify="center">
                    <DeleteSubject id={id} mutation={deleteMutation} />
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      ) : (
        <Box>
          <Callout.Root variant="surface">
            <Callout.Text>
              {isFilterActive
                ? "No subjects found."
                : "There are no subjects yet."}
            </Callout.Text>
          </Callout.Root>
        </Box>
      )}
    </ScrollArea>
  );
};
