import React from "react";
import PropTypes from "prop-types";
import { range } from "ramda";
import Col from "./Col";
import Winner from "./Winner";
import Players from "./Players";
const Presentation = ({
  numCols,
  makeOnColClick,
  numRows,
  players,
  cols,
  winner,
  makeSetPlayerToBot,
  onBack,
  onUnpause,
  paused
}) => {
  return (
    <div>
      <div>
        {range(0, numCols).map(colIndex => {
          const onColClick = makeOnColClick(colIndex);
          return (
            <Col
              numRows={numRows}
              players={players}
              cols={cols}
              key={colIndex}
              colIndex={colIndex}
              onClick={onColClick}
              winner={winner}
            />
          );
        })}
      </div>
      <div style={{ display: "inline-block", textAlign: "left", width: 160 }}>
        {winner && <Winner winner={winner} />}
        <Players players={players} makeSetPlayerToBot={makeSetPlayerToBot} />
        <button onClick={onBack}>Back</button>
        {paused && <button onClick={onUnpause}>Run bot</button>}
      </div>
    </div>
  );
};

Presentation.propTypes = {
  numCols: PropTypes.number.isRequired,
  makeOnColClick: PropTypes.func.isRequired,
  numRows: PropTypes.number.isRequired,
  players: PropTypes.array.isRequired,
  cols: PropTypes.array.isRequired,
  winner: PropTypes.object,
  makeSetPlayerToBot: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onUnpause: PropTypes.func.isRequired,
  paused: PropTypes.bool.isRequired
};

export default Presentation;
