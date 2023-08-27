const gridCoordinates = {
  root: {
    gridTemplateColumns: ["repeat(2, 1fr)", "repeat(6, 1fr)", "repeat(4, 1fr)"],
    gridTemplateRows: ["repeat(9, 1fr)", "repeat(9, 1fr)", "repeat(6, 1fr)"],
  },
  charPool: {
    heading: {
      gridColumn: ["2 / span 1", "5 / span 2", "4 / span 1"],
      gridRow: [1, 1, 1],
    },
    input: {
      gridColumn: ["2 / span 1", "5 / span 2", "4 / span 1"],
      gridRow: [2, 2, 2],
    },
  },
  header: {
    heading: {
      gridColumn: ["2 / span 1", "1 / span 4", "1 / span 1"],
      gridRow: [3, 1, 2],
    },
    flexRadioGroup: {
      gridColumn: [2, "1 / span 4", "2 / span 2"],
      gridRow: ["4 / span 2", 2, 2],
    },
  },
  divider: {
    heading: {
      gridColumn: ["1 / span 1", "1 / span 6", "1 / span 1"],
      gridRow: [6, 3, 3],
    },
    flexRadioGroup: {
      gridColumn: [1, "1 / span 6", "2 / span 3"],
      gridRow: ["7 / span 3", 4, 3],
    },
  },
  tail: {
    heading: {
      gridColumn: ["2 / span 1", "1 / span 6", "1 / span 1"],
      gridRow: [6, 5, 4],
    },
    flexRadioGroup: {
      gridColumn: [2, "1 / span 6", "2 / span 3"],
      gridRow: ["7 / span 3", 6, 4],
    },
  },
  case: {
    heading: {
      gridColumn: ["1 / span 1", "1 / span 6", "1 / span 4"],
      gridRow: [1, 7, 5],
    },
    gridRadioGroup: {
      gridColumn: [1, "1 / span 6", "1 / span 4"],
      gridRow: ["2 / span 4", "8 / span 2", 6],
      gridTemplateColumns: [
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(4, 1fr)",
      ],
      gridTemplateRows: ["repeat(4, 1fr)", "repeat(2, 1fr)", "repeat(1, 1fr)"],
    },
  },
  logButton: {
    gridColumn: ["1 / span 2", "1 / span 6", "1 / span 4"],
    gridRow: [10, 10, 7],
  },
};

export default gridCoordinates;
