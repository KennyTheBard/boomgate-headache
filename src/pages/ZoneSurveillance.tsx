import { Box, Center, SimpleGrid, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { EntryEvent, Zone } from "../types";
import { TimeTracker, ZoneLedger } from "../components";

type ZoneSurveillanceProps = {
  zones: Zone[];
};

export const ZoneSurveillance: React.FC<ZoneSurveillanceProps> = ({
  zones,
}) => {
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
      <Center>
        <Title c="white">
          Boom Gate Headache
        </Title>
      </Center>
    <TimeTracker durationMs={2 * 60 * 1000} refreshMs={500} />

    </Box>
      <SimpleGrid cols={zones.length + 1}>
        {zones.map((zone, index) => (
          <ZoneLedger
            key={index}
            zone={zone}
            entries={entriesPerZones[zone.id].map((entry) => ({
              ...entry,
              selected: selectedEntryIds.includes(entry.id),
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
