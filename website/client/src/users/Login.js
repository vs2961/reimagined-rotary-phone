import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Cookies } from "react-cookie";
import history from "../routing/history";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Alert from '@material-ui/lab/Alert';
import {
	FormControl,
	InputLabel,
	Input,
	FormHelperText,
	Grid,
	Button,
	Typography,
	Snackbar
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
	root: {
		width: "500px",
	},
}));

const Login = (props) => {
	const classes = useStyles();
	const [cookies, setCookie] = useCookies(["username", "id"]);
	const [password, setPassword] = React.useState("");
	const [username, setUsername] = React.useState("");
	const [showPassword, setVisibility] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [errorMessage, setMessage] = React.useState("");
	const verifyForm = () => {
		return password.length > 1 && username.length > 0;
	};

	const toggleVisibility = () => {
		setVisibility(!showPassword)
	}
	const handleSubmit = () => {
		axios
			.post("/login", {
				username: username,
				password: password,
			})
			.then((res) => {
				console.log(res.data);
				if (res.data.id === "Invalid user" || res.data.id === "Invalid password") {
					setOpen(true)
					setMessage(res.data.id)
				}
				else {
					setCookie("id", res.data.id, {path: "/"})
					setCookie("username", res.data.username, {path: "/"})
					history.push({
						pathname: "/",
						state: {isLoggedIn: true}
					})
				}
			})
	};
	if (typeof cookies.id != "undefined")
		return <p>You have already logged in.</p>;
	return (
		<>
			{<Snackbar open={open} autoHideDuration='3000' onClose={() => setOpen(false)} anchorOrigin = {{vertical: 'top', horizontal: 'center'}} ><Alert severity="error">{`${errorMessage}. Please try again.`}
		</Alert></Snackbar>}
			<h1>Login</h1>
			<Grid container>
				<Grid item xs={12}>
					<FormControl>
						<InputLabel htmlFor="my-input">Username</InputLabel>
						<Input
							onChange={(e) => setUsername(e.target.value)}
							value={username}
							valueid="user-input"
							aria-describedby="my-helper-text"
							className={classes.root}
						/>
						<FormHelperText id="my-helper-text">
							must contain alpha-numeric characters only!
						</FormHelperText>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<div>
					<FormControl>
						<InputLabel htmlFor="my-input">Password</InputLabel>
						<Input
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							valueid="pass-input"
							aria-describedby="my-helper-text"
							className={classes.root}
							type = {showPassword ? 'text' : 'password'}
							endAdornment = {
								<InputAdornment> <IconButton onClick = {toggleVisibility}> {!showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>} </IconButton></InputAdornment>
							} />


						<FormHelperText id="my-helper-text">
							minimum length must be 8
						</FormHelperText>
					</FormControl>
					</div>
				</Grid>

				<Grid item xs={12}>
					<Button onClick={handleSubmit} disabled={!verifyForm()}>
						Submit!
					</Button>
				</Grid>
			</Grid>
		</>
	);
};

export default Login;
