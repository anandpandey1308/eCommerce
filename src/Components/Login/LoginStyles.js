import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
    position: "relative",
  },
  errorText: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(1),
  },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 9999,
  },
  successSnackbar: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    textAlign: "center",
    fontSize: "1rem",
    fontWeight: 500,
  },
}));

export default useStyles;
