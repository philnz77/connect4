import React from "react";
import { reverse } from "ramda";
const BotPickHistory = ({ botPickHistory }) => {
  return (
    <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
      {reverse(botPickHistory).map(histItem => (
        <div style={{ display: "inline-block" }}>
          <ul style={{ listStyle: "none" }}>
            <li>{histItem.player.color}</li>
            <li>{histItem.dropEval}</li>
            <li>{histItem.turn}</li>
            <li>{histItem.dropIndex + 1}</li>
            <li>{histItem.time}</li>
          </ul>
        </div>
      ))}
      <div style={{ display: "inline-block" }}>
        <ul style={{ listStyle: "none" }}>
          <li>Color</li>
          <li>Eval</li>
          <li>Turn</li>
          <li>Col</li>
          <li>Time</li>
        </ul>
      </div>
    </div>
  );
};

export default BotPickHistory;
