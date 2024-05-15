import React from "react";
import { EntryEvent, Zone } from "../types";
import { Flex, Title } from "@mantine/core";
import { EventCard } from "./EventCard";

type ZoneLedgerProps = {
  zone: Zone;
  entries: EntryEvent[];
  onEntrySelect: (entryId: string) => void;
};

export const ZoneLedger: React.FC<ZoneLedgerProps> = ({ zone, entries, onEntrySelect }) => {
  return (
    <Flex
      mih={50}
      gap="md"
      justify="flex-start"
      align="center"
      direction="column"
      wrap="wrap"
    >
      <Title c="white" order={1}>{zone.name}</Title>
      {entries.map((entry) => (
        <EventCard entry={entry} selected={false} onSelect={() => onEntrySelect(entry.id)}/>
      ))}
    </Flex>
  );
};
