import React from "react";
import { StatEntry, StatisticRankCard } from "./StatisticRankCard";
import { VStack } from "@chakra-ui/react";
import { SingleStatCard } from "./SingleStatCard";

const Stats: React.FC = () => {
  const coffeesTotal = 140;
  const numberUsers = 10;
  const firstCoffeeDate = "7th August 2024";
  const outstandingDebts = 8;

  const powerUsers: StatEntry[] = [
    { name: "Maggus", value: 62 },
    { name: "Nick", value: 55 },
    { name: "Vinni", value: 48 },
  ];

  const coffeeRelationships: StatEntry[] = [
    { name: "Maggus & Nick", value: 41 },
    { name: "Leon & Vinni", value: 13 },
    { name: "Leon & Ole", value: 12 },
  ];

  const diverseUsers: StatEntry[] = [
    { name: "Ole", value: 8 },
    { name: "Vinni", value: 7 },
    { name: "Kacper", value: 4 },
  ];

  return (
    <VStack spacing={4} width="100%">
      <SingleStatCard
        title="Number of Coffees Logged"
        stat={coffeesTotal}
        description="That is a lot of 1.80 CHFs spent 👀"
      />
      <SingleStatCard
        title="Number of Users"
        stat={numberUsers}
        description="That magical feeling of entering the first coffee... ✨"
      />

      <StatisticRankCard
        title="Power Users"
        subtitle="Most coffees sent and received."
        funText="More Coffee = More Energy. Hmmm acceleration huh?"
        topThree={powerUsers}
      />

      <StatisticRankCard
        title="Coffee Relationships"
        subtitle="Most coffees sent between two users."
        funText="Best Coffee Buddies 🤞🤞"
        topThree={coffeeRelationships}
      />

      <StatisticRankCard
        title="Diversity Award"
        subtitle="Coffees sent to most other users."
        funText="Always spreading the love ❤️☕"
        topThree={diverseUsers}
      />

      <SingleStatCard
        title="First Coffee Logged"
        stat={firstCoffeeDate}
        description="Ole bought a coffee for Leon. This did defenitely happen."
      />

        <SingleStatCard
            title="Outstanding Debts"
            stat={outstandingDebts}
            description="Who would just leave their coffee debt unsettled... 😢"/>


    </VStack>
  );
};

export default Stats;
