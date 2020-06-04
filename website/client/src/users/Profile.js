import React from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import CompareCard from './CompareCard';
import history from "../routing/history";

class Profile extends React.Component{
    constructor (props){
        super(props)
        this.state = {myCars: []}
        this.deleteCar = this.deleteCar.bind(this)
    }
    componentDidMount(){
        const cookies = new Cookies();
        axios.post("/get_cars", {user_id:cookies.get("id")}).then(res =>
            this.setState({myCars: res.data}))
    }

    deleteCar = (val) => {
        const cookies = new Cookies();
        axios.post("/del_car", {car_id: val, user_id: cookies.get("id")}).then(res => console.log(res)).then(document.location.reload());
    }

    render(){
        console.log(this.state.myCars)
        return (<Grid container>{
            Object.entries(this.state.myCars).map( ([key,value]) => {
                return <Grid item xs={12 / this.state.myCars.length}><CompareCard func={this.deleteCar} data={value}/></Grid>

        })
        }</Grid>)
    }
}

export default Profile;
