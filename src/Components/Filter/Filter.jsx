import React, {Component} from 'react';
import {FilterInput} from "./Filter.styled";

class Filter extends Component {


    onHandleChange = (e) => {
        const {onFilter} = this.props

        onFilter(e.target.value);
    }

    render(){
        return <FilterInput onChange={this.onHandleChange} placeholder='Search' />
    }
}

export default Filter;