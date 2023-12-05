const gridCoordinates = {
  root: {
    gridTemplateColumns: {
      base: "repeat(2, 1fr)",
      sm: "repeat(6, 1fr)",
      md: "repeat(4, 1fr)"
    },
    gridTemplateRows: {
      base: "repeat(9, 1fr)",
      sm: "repeat(9, 1fr)",
      md: "repeat(6, 1fr)"
    },
  },
  charPool: {
    heading: {
      gridColumn: {
        base: "2 / span 1",
        sm: "5 / span 2",
        md: "4 / span 1"
      },
      gridRow: {
        base: 1,
        sm: 1,
        md: 1
      },
    },
    input: {
      gridColumn: {
        base: "2 / span 1",
        sm: "5 / span 2",
        md: "4 / span 1"
      },
      gridRow: {
        base: 2,
        sm: 2,
        md: 2
      },
    },
  },
  header: {
    heading: {
      gridColumn: {
        base: "2 / span 1",
        sm: "1 / span 4",
        md: "1 / span 1"
      },
      gridRow: {
        base: 3,
        sm: 1,
        md: 2
      },
    },
    flexRadioGroup: {
      gridColumn: {
        base: 2,
        sm: "1 / span 4",
        md: "2 / span 2"
      },
      gridRow: {
        base: "4 / span 2",
        sm: 2,
        md: 2
      },
    },
  },
  divider: {
    heading: {
      gridColumn: {
        base: "1 / span 1",
        sm: "1 / span 6",
        md: "1 / span 1"
      },
      gridRow: {
        base: 6,
        sm: 3,
        md: 3
      },
    },
    flexRadioGroup: {
      gridColumn: {
        base: 1,
        sm: "1 / span 6",
        md: "2 / span 3"
      },
      gridRow: {
        base: "7 / span 3",
        sm: 4,
        md: 3
      },
    },
  },
  tail: {
    heading: {
      gridColumn: {
        base: "2 / span 1",
        sm: "1 / span 6",
        md: "1 / span 1"
      },
      gridRow: {
        base: 6,
        sm: 5,
        md: 4
      },
    },
    flexRadioGroup: {
      gridColumn: {
        base: 2,
        sm: "1 / span 6",
        md: "2 / span 3"
      },
      gridRow: {
        base: "7 / span 3",
        sm: 6,
        md: 4
      },
    },
  },
  case: {
    heading: {
      gridColumn: {
        base: "1 / span 1",
        sm: "1 / span 6",
        md: "1 / span 4"
      },
      gridRow: {
        base: 1,
        sm: 7,
        md: 5
      },
    },
    gridRadioGroup: {
      gridColumn: {
        base: 1,
        sm: "1 / span 6",
        md: "1 / span 4"
      },
      gridRow: {
        base: "2 / span 4",
        sm: "8 / span 2",
        md: 6
      },
      gridTemplateColumns: {
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(4, 1fr)"
      },
      gridTemplateRows: {
        base: "repeat(4, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(1, 1fr)"
      },
    },
  },
  logButton: {
    gridColumn: {
      base: "1 / span 2",
      sm: "1 / span 6",
      md: "1 / span 4"
    },
    gridRow: {
      base: 10,
      sm: 10,
      md: 7
    },
  },
};

export default gridCoordinates;
