import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import { Box, Callout, Flex, ScrollArea, Table, Text } from "@radix-ui/themes";
import { EditSubject } from "../EditSubject";
import { DeleteSubject } from "../DeleteSubject";
import { UpdateSubjectMutation } from "../../hooks/useSubjectUpdate";
import { DeleteSubjectMutation } from "../../hooks/useSubjectDelete";
import { Subject, SubjectForm } from "../../types/subject";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import "./styles.css";

interface Props {
  subjects: Subject[];
  isFilterActive: boolean;
  updateMutation: UpdateSubjectMutation;
  deleteMutation: DeleteSubjectMutation;
}

const sortData = (
  data: Subject[],
  sortBy: keyof SubjectForm,
  sortOrder: "asc" | "desc"
) => {
  return data.sort((a, b) => {
    const compareA =
      sortBy === "diagnosisDate"
        ? new Date(a[sortBy]).getTime()
        : a[sortBy].toLowerCase();
    const compareB =
      sortBy === "diagnosisDate"
        ? new Date(b[sortBy]).getTime()
        : b[sortBy].toLowerCase();

    if (sortOrder === "asc") {
      return compareA > compareB ? 1 : -1;
    } else {
      return compareA < compareB ? 1 : -1;
    }
  });
};

export const SubjectsTable = ({
  subjects,
  isFilterActive,
  deleteMutation,
  updateMutation,
}: Props) => {
  const [sortBy, setSortBy] = useState<keyof SubjectForm>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof SubjectForm) => {
    const order = sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(field);
    setSortOrder(order);
  };

  const sortedSubjects = sortData([...subjects], sortBy, sortOrder);
  const icon = sortOrder === "asc" ? <TriangleUpIcon /> : <TriangleDownIcon />;

  return (
    <ScrollArea
      type="auto"
      scrollbars="vertical"
      style={{ height: "400px", borderRadius: "7px" }}
    >
      {sortedSubjects?.length > 0 ? (
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell />
              <Table.ColumnHeaderCell
                className="header"
                onClick={() => handleSort("name")}
              >
                <Flex gap="1" align="center">
                  <Text>Name</Text>
                  {sortBy === "name" && icon}
                </Flex>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell
                className="header"
                onClick={() => handleSort("sex")}
              >
                <Flex gap="1" align="center">
                  <Text>Sex</Text>
                  {sortBy === "sex" && icon}
                </Flex>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell
                className="header"
                onClick={() => handleSort("status")}
              >
                <Flex gap="1" align="center">
                  <Text>Status</Text>
                  {sortBy === "status" && icon}
                </Flex>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell
                className="header"
                onClick={() => handleSort("diagnosisDate")}
              >
                <Flex gap="1" align="center">
                  <Text>Diagnosis Date</Text>
                  {sortBy === "diagnosisDate" && icon}
                </Flex>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sortedSubjects.map(({ id, name, diagnosisDate, sex, status }) => (
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
