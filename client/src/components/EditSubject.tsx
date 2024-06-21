import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import {
  Text,
  Box,
  Button,
  Flex,
  TextField,
  RadioGroup,
  Dialog,
  IconButton,
} from "@radix-ui/themes";
import { Subject, SubjectForm } from "../types/subject";
import { UpdateSubjectMutation } from "../hooks/useSubjectUpdate";
import { Pencil2Icon } from "@radix-ui/react-icons";

interface Props {
  mutation: UpdateSubjectMutation;
  subject: Subject;
}

export const EditSubject = ({
  mutation,
  subject: { id, ...initialState },
}: Props) => {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState<SubjectForm>(initialState);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await mutation.mutate({ id, ...subject });
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <IconButton size="1" variant="ghost">
          <Pencil2Icon />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit subject</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to the subject details.
        </Dialog.Description>

        <Form.Root onSubmit={submit}>
          <Flex direction="column" gap="3">
            <Box mb="4">
              <Flex direction="column">
                <Text as="label" size="2" weight="medium" mb="2" htmlFor="name">
                  Name
                </Text>
                <Form.Field name="name">
                  <Form.Control asChild required>
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
                  </Form.Control>
                  <Form.Message match="valueMissing">
                    <Text as="span" size="1" mb="2" color="red">
                      Name is required
                    </Text>
                  </Form.Message>
                </Form.Field>
              </Flex>
            </Box>

            <Box mb="4">
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
                <Form.Field name="date">
                  <Form.Control asChild required>
                    <TextField.Root
                      id="date"
                      type="datetime-local"
                      variant="classic"
                      placeholder="Enter the diagnosis date"
                      value={subject.diagnosisDate}
                      onChange={(e) =>
                        setSubject((state) => ({
                          ...state,
                          diagnosisDate: e.target.value,
                        }))
                      }
                    />
                  </Form.Control>
                  <Form.Message match="valueMissing">
                    <Text as="span" size="1" mb="2" color="red">
                      Diagnosis Date is required
                    </Text>
                  </Form.Message>
                </Form.Field>
              </Flex>
            </Box>

            <Flex>
              <Box mb="4" flexGrow="1">
                <Flex direction="column">
                  <Text
                    as="label"
                    size="2"
                    weight="medium"
                    mb="2"
                    htmlFor="sex"
                  >
                    Sex
                  </Text>
                  <Form.Field name="sex">
                    <Form.Control asChild required>
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
                    </Form.Control>
                  </Form.Field>
                </Flex>
              </Box>

              <Box mb="4" flexGrow="1">
                <Flex direction="column">
                  <Text
                    as="label"
                    size="2"
                    weight="medium"
                    mb="2"
                    htmlFor="status"
                  >
                    Status
                  </Text>
                  <Form.Field name="status">
                    <Form.Control asChild required>
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
                        <RadioGroup.Item value="Enrolled">
                          Enrolled
                        </RadioGroup.Item>
                        <RadioGroup.Item value="Failed">Failed</RadioGroup.Item>
                      </RadioGroup.Root>
                    </Form.Control>
                  </Form.Field>
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

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Form.Submit asChild>
                <Button
                  variant="surface"
                  type="submit"
                  loading={mutation.isPending}
                >
                  Save
                </Button>
              </Form.Submit>
            </Flex>
          </Flex>
        </Form.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};
