import React, { useState } from "react";
import { EntryEvent } from "../types";
import { Text, Paper, Group, Indicator } from "@mantine/core";
import { JSX } from "react/jsx-runtime";

type EventCardProps = {
  entry: EntryEvent;
  onSelect: () => void;
};

export const EventCard: React.FC<EventCardProps> = ({ entry, onSelect }) => {
  const selected = (entry.selectedIndex ?? -1) >= 0;

  const decorateWithIndicator = (children: JSX.Element) => {
    return selected ? (
      <Indicator label={entry.selectedIndex} position="top-start" size={30}>
        {children}
      </Indicator>
    ) : (
      children
    );
  };

  return decorateWithIndicator(
    <Paper
      shadow="md"
      radius="md"
      p="sm"
      bg={selected ? "yellow" : "white"}
      onClick={onSelect}
    >
      <Group justify="space-between">
        <Text component="p" style={{ userSelect: "none" }}>
          {entry.fromZone.name}
        </Text>
        <Text component="p" fw={700} style={{ userSelect: "none" }} pr="xl" pl="xl">
          {entry.carPlate}
        </Text>
        <Text component="p" style={{ userSelect: "none" }}>
          {entry.at.getHours()}:{entry.at.getMinutes()}
        </Text>
      </Group>
    </Paper>
  );
};
