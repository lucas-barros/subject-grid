import React, { useState } from "react";
import * as RadixForm from "@radix-ui/react-form";
import {
  Text,
  Box,
  Button,
  Flex,
  Heading,
  TextField,
  RadioGroup,
} from "@radix-ui/themes";
import { CreateSubjectMutation } from "../hooks/useSubjectCreate";
import { SubjectForm } from "../types/subject";

interface Props {
  mutation: CreateSubjectMutation;
}

const initialState = {
  name: "",
  sex: "Male",
  diagnosisDate: Date.now().toLocaleString(),
  status: "Screening",
};

export const CreateSubject = ({ mutation }: Props) => {
  const [subject, setSubject] = useState<SubjectForm>(initialState);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await mutation.mutate(subject);
    setSubject(initialState);
  };

  return (
    <RadixForm.Root onSubmit={submit}>
      <Box mb="4">
        <Heading align="center" as="h3" size="4">
          Create Subject
        </Heading>
      </Box>

      <Box mb="5">
        <Flex direction="column">
          <Text as="label" size="2" weight="medium" mb="2" htmlFor="name">
            Name
          </Text>
          <RadixForm.Field name="name">
            <RadixForm.Control asChild required>
              <TextField.Root
                id="name"
                type="text"
                variant="classic"
                placeholder="Enter name"
                value={subject.name}
                onChange={(e) =>
                  setSubject((state) => ({
                    ...state,
                    name: e.target.value,
                  }))
                }
              />
            </RadixForm.Control>
            <RadixForm.Message match="valueMissing">
              <Text as="span" size="1" mb="2" color="red">
                Name is required
              </Text>
            </RadixForm.Message>
          </RadixForm.Field>
        </Flex>
      </Box>

      <Box mb="5">
        <Flex direction="column">
          <Text
            as="label"
            size="2"
            weight="medium"
            mb="2"
            htmlFor="diagnosisDate"
          >
            Diagnosis Date
          </Text>
          <RadixForm.Field name="date">
            <RadixForm.Control asChild required>
              <TextField.Root
                id="date"
                type="datetime-local"
                variant="classic"
                placeholder="Enter the diagnosis date"
                value={subject.diagnosisDate}
                onChange={(e) => {
                  setSubject((state) => ({
                    ...state,
                    diagnosisDate: e.target.value,
                  }));
                }}
              />
            </RadixForm.Control>
            <RadixForm.Message match="valueMissing">
              <Text as="span" size="1" mb="2" color="red">
                Diagnosis Date is required
              </Text>
            </RadixForm.Message>
          </RadixForm.Field>
        </Flex>
      </Box>

      <Flex>
        <Box mb="5" flexGrow="1">
          <Flex direction="column">
            <Text as="label" size="2" weight="medium" mb="2" htmlFor="sex">
              Sex
            </Text>
            <RadixForm.Field name="sex">
              <RadioGroup.Root
                defaultValue="1"
                value={subject.sex}
                name="sex"
                onValueChange={(value) =>
                  setSubject((state) => ({
                    ...state,
                    sex: value,
                  }))
                }
              >
                <RadioGroup.Item value="Male">Male</RadioGroup.Item>
                <RadioGroup.Item value="Female">Female</RadioGroup.Item>
              </RadioGroup.Root>
            </RadixForm.Field>
          </Flex>
        </Box>

        <Box mb="5" flexGrow="1">
          <Flex direction="column">
            <Text as="label" size="2" weight="medium" mb="2" htmlFor="status">
              Status
            </Text>
            <RadixForm.Field name="status">
              <RadioGroup.Root
                defaultValue="1"
                name="status"
                value={subject.status}
                onValueChange={(value) =>
                  setSubject((state) => ({
                    ...state,
                    status: value,
                  }))
                }
              >
                <RadioGroup.Item value="Screening">
                  In Screening
                </RadioGroup.Item>
                <RadioGroup.Item value="Enrolled">Enrolled</RadioGroup.Item>
                <RadioGroup.Item value="Failed">Failed</RadioGroup.Item>
              </RadioGroup.Root>
            </RadixForm.Field>
          </Flex>
        </Box>
      </Flex>

      <Box mb="5">
        {mutation.isError && (
          <Text color="red" size="1">
            {mutation.error.response?.data.error}
          </Text>
        )}
      </Box>

      <Flex mt="6" justify="end" gap="3">
        <RadixForm.Submit asChild>
          <Button variant="surface" type="submit" loading={mutation.isPending}>
            Create subject
          </Button>
        </RadixForm.Submit>
      </Flex>
    </RadixForm.Root>
  );
};
