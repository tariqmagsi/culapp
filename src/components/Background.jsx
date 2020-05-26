import React,{Component} from 'react';
import { Helmet } from 'react-helmet';

export class Background extends Component {
    render() {
        return (
            <Helmet bodyAttributes={{style: "background: url('../image/login.jpg'); background-size: cover; background-repeat: no-repeat;"}} />
        )
    }
}