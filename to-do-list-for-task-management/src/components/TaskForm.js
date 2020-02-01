import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/Index';

class TaskForm extends Component {
    state = {
        id: '',
        name: '',
        status: false
    }

    componentWillMount() {
        if(this.props.task) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.task) {
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status
            });
        } else if(!nextProps.task) {
            this.onClear();
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onChange = event => {
        const target = event.target;
        const name = target.name;
        let value = target.value;
        // if( name === 'status') value = target.value === 'true' ? true : false; 
        this.setState({
            [name]: value
        });
    }

    onSubmit = event => {
        event.preventDefault();
        this.props.onAddTask(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            id: '',
            name: '',
            status: false
        });
    }

    render() {
        const { name, status, id} = this.state;
        return(
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        { id !== '' ? 'Cập Nhật Công Việc' : 'Thêm công việc'}
                        <span 
                            className="fa fa-times-circle text-right"
                            onClick={ this.onCloseForm }
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <label>Tên :</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="name"
                            value={ name }
                            onChange={ this.onChange }
                        />
                        <br/>

                        <label>Trạng thái :</label>
                        <select 
                            className="form-control"
                            name="status"
                            value={ status }
                            onChange={ this.onChange }
                        >
                            <option value={true}>Kích hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select><br/>
                        <div className="text-center">
                            <button 
                                type="submit" 
                                className="btn btn-warning"
                            >
                                <span className="fa fa-plus mr-5"></span>Lưu lại
                            </button>&nbsp;
                            <button 
                                type="button" 
                                className="btn btn-danger"
                                onClick={ this.onClear }
                            >
                                <span className="fa fa-close mr-5"></span>Hủy bỏ
                            </button>
                        </div>
                    </div>

                </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddTask: task => {
            dispatch(actions.addTask(task));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);