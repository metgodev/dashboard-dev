import tinycolor from "tinycolor2";

const primary = "#F58840";
const secondary = "#C84B31";
const warning = "#9C3D54";
const success = "#146356";
const info = "#CAF7E3";
const bg = "#2D4263";

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
      contrastText: "#F58840",
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
    bg: {
      main: bg,
      light: tinycolor(bg)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(bg)
        .darken(darkenRate)
        .toHexString(),
    },
    text: {
      primary: "#FFC260",
      secondary: "#C8E3D4",
      hint: "#87AAAA",
    },
    background: {
      default: "#2a3a46",
      secondary: "#082032",
    },
    action: {
      disabledBackground: '#87AAAA',
      disabled: '#B9B9B9'
    },
  },
  shape: {
    borderRadius: 10,
  },
  customShadows: {
    widget:
      "0px 3px 11px 0px #082032, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetDark:
      "0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetWide:
      "0px 12px 33px 0px #082032, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
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
          "0px 3px 11px 0px #082032, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
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
          backgroundColor: "#2D4263 !important",
          "&:focus": {
            backgroundColor: "#2D4263",
          },
        },
      },
      button: {
        "&:hover, &:focus": {
          backgroundColor: "#191919",
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
        backgroundColor: "#082032",
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
        backgroundColor: '#F58840',
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
    MuiPaper: {
      root: {
        backgroundColor: '#082032',
      }
    },
    MuiButton: {
      root: {
        borderRadius: 10,
      },
      contained: {
        backgroundColor: '#082032',
      }
    },
    MuiOutlinedInput: {
      input: {
        padding: 9
      }
    },
    MuiTypography: {
      alignLeft: {
        textAlign: 'center'
      }
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
    MuiPickersTimePickerToolbar: {
      toolbarAmpmLeftPadding: {
        justifyContent: 'space-between'
      }
    },
  }
};


