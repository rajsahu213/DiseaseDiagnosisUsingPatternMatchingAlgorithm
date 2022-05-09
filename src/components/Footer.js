import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "Column",
        backgroundColor: "rgb(40, 96, 145)",
    },
    footer: {
        backgroundColor: "rgb(148, 198, 242)",
        marginTop: theme.spacing.unit * 8,
        padding: `${theme.spacing.unit * 6}px 0`,
    },
});

function Footer(props) {
    const { classes } = props;

    return (
        <footer className={classes.footer}>
            <Paper
                className={classes.root}
                style={{ color: "whitesmoke" }}
                elevation={1}
            >
                <Typography variant="h5" component="h3">
                    Final Year Project Team 34
                </Typography>
                <Typography component="p">
                    Raj Sahu | Anand Raut | Mohammed Qayyum
                </Typography>
                <Typography component="p">@2022 All right reserved</Typography>
            </Paper>
        </footer>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
