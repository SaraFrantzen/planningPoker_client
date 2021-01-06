import React from "react";
import { Statistic } from "semantic-ui-react";

const VotingStatus = ({ status0, status1, status2, status3 }) => {
  return (
    <>
      <Statistic.Group size="mini">
        <Statistic color="red" id="statistics">
          <Statistic.Value>points</Statistic.Value>
          <Statistic.Label>No of votes</Statistic.Label>
        </Statistic>
        <Statistic color="red">
          <Statistic.Value>0</Statistic.Value>
          {status0 > 0 && (
            <Statistic.Label data-cy="points-0">{status0}</Statistic.Label>
          )}
        </Statistic>
        <Statistic color="red">
          <Statistic.Value>1</Statistic.Value>
          {status1 > 0 && (
            <Statistic.Label data-cy="points-1">{status1}</Statistic.Label>
          )}
        </Statistic>
        <Statistic color="red">
          <Statistic.Value>2</Statistic.Value>
          {status2 > 0 && (
            <Statistic.Label data-cy="points-2">{status2}</Statistic.Label>
          )}
        </Statistic>
        <Statistic color="red">
          <Statistic.Value>3</Statistic.Value>
          {status3 > 0 && (
            <Statistic.Label data-cy="points-3">{status3}</Statistic.Label>
          )}
        </Statistic>
      </Statistic.Group>
    </>
  );
};

export default VotingStatus;
