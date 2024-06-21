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
} from "@radix-ui/themes";
import { SubjectForm } from "../types/subject";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

interface Props {
  filters: SubjectForm;
  onFilter: (filter: SubjectForm) => void;
  onCancel: () => void;
}

export const Filter = ({ filters, onFilter, onCancel }: Props) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<SubjectForm>(filters);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFilter(state);
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button mb="2" radius="full" variant="soft">
          <Text>Filters</Text>
          <MagnifyingGlassIcon />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Filter subjects</Dialog.Title>
        <Form.Root onSubmit={submit}>
          <Flex direction="column" gap="3">
            <Box mb="4">
              <Flex direction="column">
                <Text as="label" size="2" weight="medium" mb="2" htmlFor="name">
                  Name
                </Text>
                <Form.Field name="name">
                  <TextField.Root
                    id="name"
                    type="text"
                    variant="classic"
                    placeholder="Filter by name"
                    value={state.name}
                    onChange={(e) =>
                      setState((state) => ({
                        ...state,
                        name: e.target.value,
                      }))
                    }
                  />
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
                  <TextField.Root
                    id="date"
                    type="date"
                    variant="classic"
                    placeholder="Filter by diagnosis date"
                    value={state.diagnosisDate}
                    onChange={(e) =>
                      setState((state) => ({
                        ...state,
                        diagnosisDate: e.target.value,
                      }))
                    }
                  />
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
                    <RadioGroup.Root
                      name="sex"
                      value={state.sex}
                      onValueChange={(value) =>
                        setState((state) => ({
                          ...state,
                          sex: value,
                        }))
                      }
                    >
                      <RadioGroup.Item value="Male">Male</RadioGroup.Item>
                      <RadioGroup.Item value="Female">Female</RadioGroup.Item>
                    </RadioGroup.Root>
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
                    <RadioGroup.Root
                      name="status"
                      value={state.status}
                      onValueChange={(value) =>
                        setState((state) => ({
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
                  </Form.Field>
                </Flex>
              </Box>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close onClick={onCancel}>
                <Button variant="soft" color="gray">
                  Remove
                </Button>
              </Dialog.Close>
              <Form.Submit asChild>
                <Button variant="surface" type="submit">
                  Filter
                </Button>
              </Form.Submit>
            </Flex>
          </Flex>
        </Form.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};
