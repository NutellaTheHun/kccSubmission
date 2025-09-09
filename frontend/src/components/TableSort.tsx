import { Center, Group, Table, Text, UnstyledButton } from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from "@tabler/icons-react";
import type { StormOverlapStateDto } from "../dto/StormOverlapStateDto";
import classes from "./TableSort.module.css";

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th style={{ fontSize: 16 }}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

interface Props {
  data: StormOverlapStateDto[] | null;
  sortByState: [string, (key: string) => void];
  sortOrderState: [string, (key: string) => void];
}

export function TableSort({ data, sortByState, sortOrderState }: Props) {
  const [sortBy, setSortBy] = sortByState;
  const [sortOrder, setSortOrder] = sortOrderState;

  const setSorting = (field: keyof StormOverlapStateDto) => {
    setSortOrder(field === sortBy && sortOrder === "ASC" ? "DESC" : "ASC");
    setSortBy(field);
  };

  if (!data) {
    data = [];
  }

  const rows = data.map((row) => (
    <Table.Tr key={row.maxWindSpeed + row.date}>
      <Table.Td style={{ width: 120 }}>{row.date}</Table.Td>
      <Table.Td style={{ width: 120 }}>{row.name}</Table.Td>
      <Table.Td>{row.maxWindSpeed}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table horizontalSpacing="xl" verticalSpacing="md" miw={700} layout="auto">
      <Table.Thead>
        <Table.Tr>
          <Th
            sorted={sortBy === "date"}
            reversed={sortOrder === "DESC"}
            onSort={() => setSorting("date")}
          >
            Landfall Date
          </Th>
          <Th
            sorted={sortBy === "name"}
            reversed={sortOrder === "DESC"}
            onSort={() => setSorting("name")}
          >
            Name
          </Th>

          <Th
            sorted={sortBy === "maxWindSpeed"}
            reversed={sortOrder === "DESC"}
            onSort={() => setSorting("maxWindSpeed")}
          >
            Max Wind Speed Kts
          </Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {rows.length > 0 ? (
          rows
        ) : (
          <Table.Tr>
            <Table.Td colSpan={3}>
              <Text fw={500} ta="center">
                Nothing found
              </Text>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  );
}
