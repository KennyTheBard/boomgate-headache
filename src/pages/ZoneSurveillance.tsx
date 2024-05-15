import {
  Box,
  Button,
  Center,
  Flex,
  Group,
  rem,
  SimpleGrid,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { EntryEvent, Zone } from "../types";
import { TimeTracker, ZoneLedger } from "../components";
import { IconCar, IconTrash } from "@tabler/icons-react";

type ZoneSurveillanceProps = {
  zones: Zone[];
};

export const ZoneSurveillance: React.FC<ZoneSurveillanceProps> = ({
  zones,
}) => {
  // TODO: generate complete events
  // TODO: generate entry events
  const [selectedEntryIds, setSelectedEntryIds] = useState<string[]>([]);
  const [entriesPerZones, setEntriesPerZones] = useState<
    Record<string, EntryEvent[]>
  >(
    zones.reduce(
      (acc, zone, index) => ({
        ...acc,
        [zone.id]: [
          {
            id: new Date().getTime().toString(),
            fromZone: zones[(index + 1) % zones.length],
            carPlate: "ABC 123",
            at: new Date(),
          },
        ],
      }),
      {}
    )
  );

  const onEntrySelect = (entryId: string) => {
    setSelectedEntryIds((prevSelectedEntryIds) => {
      if (prevSelectedEntryIds.includes(entryId)) {
        return prevSelectedEntryIds;
      }
      return [...prevSelectedEntryIds, entryId];
    });
  };

  useEffect(() => console.log(selectedEntryIds), [selectedEntryIds]);

  return (
    <>
      <Box pt="md" pb="xl">
        <SimpleGrid cols={2} pb="lg">
          <Center>
            <Title c="white">Boom Gate Headache</Title>
          </Center>
          <Flex
            mih={50}
            gap="sm"
            justify="right"
            align="flex-end"
            direction="row"
            wrap="wrap"
          >
            <Button
              variant="filled"
              color="gray"
              size="lg"
              leftSection={
                <IconTrash style={{ width: rem(24), height: rem(24) }} />
              }
            >
              Discard
            </Button>
            <Button
              variant="filled"
              color="green"
              size="lg"
              leftSection={
                <IconCar style={{ width: rem(24), height: rem(24) }} />
              }
            >
              Complete
            </Button>
          </Flex>
        </SimpleGrid>

        <TimeTracker durationMs={2 * 60 * 1000} refreshMs={500} />
      </Box>
      <SimpleGrid cols={zones.length + 1}>
        {zones.map((zone, index) => (
          <ZoneLedger
            key={index}
            zone={zone}
            entries={entriesPerZones[zone.id].map((entry) => ({
              ...entry,
              selectedIndex: selectedEntryIds.findIndex(
                (selectedEntryId) => selectedEntryId === entry.id
              ),
            }))}
            onEntrySelect={onEntrySelect}
          />
        ))}
        <ZoneLedger
          entries={[]}
          zone={{
            id: 9999,
            name: "Outside",
            outside: true,
          }}
          onEntrySelect={onEntrySelect}
        />
      </SimpleGrid>
    </>
  );
};
