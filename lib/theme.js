import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import lightBlue from "@material-ui/core/colors/lightBlue";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";

/* Create your app color theme here */
export const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  },
  palette: {
    primary: {
      main:lightBlue[600]
    },
    secondary: red,
    favoriteIcon: pink[400],
    commentIcon: blue[700],
    type: "light"
  }
});