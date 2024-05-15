import { SimpleGrid } from "@mantine/core";
import React, { useState } from "react";
import { Zone } from "../types";
import { ZoneLedger } from "../components";

type ZoneSurveillanceProps = {
  zones: Zone[];
};

export const ZoneSurveillance: React.FC<ZoneSurveillanceProps> = ({
  zones,
}) => {
  const [selectedEntryIds, setSelectedEntryIds] = useState<string[]>([]);

  const onEntrySelect = (entryId: string) => {

    setSelectedEntryIds(prevSelectedEntryIds => {
        if (prevSelectedEntryIds.includes(entryId)) {
            return prevSelectedEntryIds;
        }
        return [...prevSelectedEntryIds, entryId];
    });
  }

  return (
    <SimpleGrid cols={zones.length + 1}>
      {zones.map((zone, index) => (
        <ZoneLedger
          key={index}
          zone={zone}
          entries={[
            {
              id: new Date().getTime().toString(),
              fromZone: zones[(index + 1) % zones.length],
              carPlate: "ABC 123",
              at: new Date(),
              // TODO: add selectedEntryIds
            },
          ]}
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
  );
};
