import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#3f51b5",
    boxShadow: "none",
  },
  title: {
    flexGrow: 1,
    fontFamily: "Roboto, sans-serif",
    fontWeight: 700,
    letterSpacing: "0.2rem",
    marginLeft: theme.spacing(2),
  },
  avatar: {
    marginLeft: theme.spacing(2),
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  menu: {
    marginTop: theme.spacing(6),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: "auto",
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    color: "black",
  },
}));
