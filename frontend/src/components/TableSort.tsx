import {
  Center,
  Group,
  ScrollArea,
  Table,
  Text,
  UnstyledButton,
} from "@mantine/core";
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
    <Table.Th className={classes.th}>
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
/*
interface RowData {
  name: string;
  email: string;
  company: string;
}*/

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
    <Table.Tr key={row.id}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.maxWindSpeed}</Table.Td>
      <Table.Td>{row.date}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        layout="fixed"
      >
        <Table.Tbody>
          <Table.Tr>
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
              Max Sustained Wind Speed Kts
            </Th>
            <Th
              sorted={sortBy === "date"}
              reversed={sortOrder === "DESC"}
              onSort={() => setSorting("date")}
            >
              Landfall Date
            </Th>
          </Table.Tr>
        </Table.Tbody>
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
    </ScrollArea>
  );
}
