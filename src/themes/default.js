import tinycolor from "tinycolor2";

const primary = "#142F43";
const secondary = "#EC255A";
const warning = "#FFC260";
const success = "#3CD4A0";
const info = "#9013FE";
const bg = "#E8EAFC";

//graph lines
const graphlinegreen = "#80C838";
const graphlineorange = "#FF6633";

const lightenRate = 7.5;
const darkenRate = 15;

export default {
  palette: {
    primary: {
      main: primary,
      light: tinycolor(primary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(primary)
        .darken(darkenRate)
        .toHexString(),
    },
    secondary: {
      main: secondary,
      light: tinycolor(secondary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(secondary)
        .darken(darkenRate)
        .toHexString(),
      contrastText: "#FFFFFF",
    },
    warning: {
      main: warning,
      light: tinycolor(warning)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(warning)
        .darken(darkenRate)
        .toHexString(),
    },
    success: {
      main: success,
      light: tinycolor(success)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(success)
        .darken(darkenRate)
        .toHexString(),
    },
    info: {
      main: info,
      light: tinycolor(info)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(info)
        .darken(darkenRate)
        .toHexString(),
    },
    graphlinegreen: {
      main: graphlinegreen,
      light: tinycolor(graphlinegreen)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(graphlinegreen)
        .darken(darkenRate)
        .toHexString(),
    },
    graphlineorange: {
      main: graphlineorange,
      light: tinycolor(graphlineorange)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(graphlineorange)
        .darken(darkenRate)
        .toHexString(),
    },
    text: {
      primary: "#4A4A4A",
      secondary: "#6E6E6E",
      hint: "#B9B9B9",
    },
    background: {
      default: "#F6F7FF",
      light: "#F3F5FF",
    },
    bg: {
      main: bg,
      light: tinycolor(bg)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(bg)
        .darken(darkenRate)
        .toHexString(),
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '*': {
            'scrollbar-width': 'thin',
          },
          '*::-webkit-scrollbar': {
            width: '4px',
            height: '4px',
          }
        }
      }
    }
  },
  shape: {
    borderRadius: 10,
  },
  customShadows: {
    widget:
      "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetDark:
      "0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetWide:
      "0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
  },
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: "#4A4A4A1A",
      },
    },
    MuiMenu: {
      paper: {
        boxShadow:
          "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
      },
    },
    MuiSelect: {
      icon: {
        color: "#B9B9B9",
      },
    },
    MuiListItem: {
      root: {
        "&$selected": {
          backgroundColor: "#F3F5FF !important",
          "&:focus": {
            backgroundColor: "#F3F5FF",
          },
        },
      },
      button: {
        "&:hover, &:focus": {
          backgroundColor: "#F3F5FF",
        },
      },
    },
    MuiList: {
      padding: {
        paddingTop: 0,
      },
    },
    MuiTouchRipple: {
      child: {
        backgroundColor: "white",
      },
    },
    MuiTableRow: {
      root: {
        height: 56,
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: "1px solid rgba(224, 224, 224, .5)",
      },
      head: {
        fontSize: "0.95rem",
      },
      body: {
        fontSize: "0.95rem",
      },
    },
    MuiPickersStaticWrapper: {
      staticWrapperRoot: {
        paddingTop: "5%",
        backgroundColor: 'transparent',
        minWidth: '100%',
        maxWidth: '100%',
      },
    },
    MuiPickersCalendarHeader: {
      iconButton: {
        backgroundColor: '#E8EAFC',
      }
    },
    MuiIconButton: {
      root: {
        color: primary,
        padding: 0
      }
    },
    MuiPickersBasePicker: {
      pickerView: {
        minWidth: '70%',
        maxWidth: '100%',
      }
    },
    MuiButton: {
      root: {
        borderRadius: 10,
      },
      contained: {
        backgroundColor: '#F99600',
      }
    },
    MuiOutlinedInput: {
      input: {
        padding: 9,
      }
    },
    MuiTypography: {
      alignLeft: {
        textAlign: 'center'
      },
    },
    MuiDialogTitle: {
      root: {
        padding: 0,
      }
    },
    MuiDialogContent: {
      root: {
        padding: 0,
      }
    },
    MuiBox: {
      root: {
        padding: 8,
      }
    },
  },
};
