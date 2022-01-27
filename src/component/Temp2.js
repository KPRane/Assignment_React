import React, { Component } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';


const regExForTask = RegExp(/^[ A-Za-z0-9]*$/);


export class Temp2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: [],
            isFlag: 0,
            id: '',
            task: '',
            date: null,
            priority: null,
            index: 0,
            errors: { task: '', priority: '' },
            tasks: [{ id: 1, task: "Reading books", priority: 2, date: "17-Oct-21" },]
        }

    }

    componentDidMount() {
        const URL = "http://localhost:3003/table";
        // const formdata={id:this.state.id};
        fetch(URL)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ formData: data })
                console.log(this.state.formData)
            })
        const allTasks = localStorage.getItem("taskList");
        this.setState({ tasks: JSON.parse(allTasks) });
    }

    handler = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'task':
                errors.task = regExForTask.test(value) ? '' : 'should be in alphnumberic';
                break;
            case 'priority':
                errors.priority = value > 5 ? 'Priority shoulb be 1-5' : '';
                break;

        }
        this.setState({ errors, [name]: value }, () => {
            console.log(errors)
        })
    }

    addTask = (event) => {

        let arr = [];
        event.preventDefault();
        let { task, priority, id, tasks, date } = this.state;
        this.setState({ tasks: [...tasks, { task, priority, id, date }] })
        console.log(tasks)

        arr.push(...tasks, { task, priority, date });
        localStorage.setItem('taskList', JSON.stringify(arr));

        //    arr.push({task,priority})
        //    localStorage.setItem("taskList",JSON.stringify(arr))

        document.querySelectorAll("input").forEach(ele => { ele.value = " " })
        this.add();

    }

    add = (event) => {

        let formData = {

            task: this.state.task,
            priority: this.state.priority

        }

        const URL = "http://localhost:3003/table"
        axios.post(URL, formData)

            .catch(err => { console.log(err) })
        console.log(formData);

    }


    // deleteTask = (id) => {
    //     // const tasks = [...this.state.tasks];
    //     // tasks.splice(id, 1);
    //     // this.setState({ tasks: [...tasks] })
    //     const filteredItems = this.state.tasks.filter(task=>task.id !== id)
    //     this.setState({
    //         tasks: filteredItems})
    //     //this.setState[{tasks:""}]

    // }
    deleteTask = (id) => {
        // const tasks=[...this.state.tasks];
        const user = JSON.parse(localStorage.getItem('taskList'))
        console.log(user)
        const bool = window.confirm("Do You really want to delele this?")
        if (bool == true) {
            user.splice(id, 1)
            this.setState({ tasks: [...user] });
            localStorage.setItem('taskList', JSON.stringify(user));
        }
        const user1 = JSON.parse(localStorage.getItem('taskList'))
        const userd = user1.TaskList
        this.setState({ ...userd })
    }


    editTask = (index) => {
        console.log(this.state.tasks)
        const tasks = [...this.state.tasks];
        console.log(tasks)
        tasks[index].task = `<strike>${tasks[index].task}</strike>`;
        this.setState({ tasks: [...tasks] })

    }
    update2(index) {
        console.log("on")
        this.setState({ index: index, isFlag: 1 })
        console.log(this.state.tasks[index].task)

        //console.log( document.getElementById("text1").value)
        // document.getElementById("text1").value = this.state.tasks[index].task
        // document.getElementById("text2").value= this.state.tasks[index].priority


    }
    updatetask() {
        // const temp=this.state.id;
        console.log('1')
        const tasks = [...this.state.tasks];
        console.log('2')
        const update = document.getElementById("text1").value;
        console.log('3')
        const update1 = document.getElementById("text2").value;
        const update2 = document.getElementById("date-picker1").value;
        console.log(update2)
        // tasks[index].task = update;
        this.state.tasks[this.state.index] = { "task": update, "priority": update1, "date": update2 }
        console.log(this.state.tasks)
        this.setState({ tasks: this.state.tasks });
        console.log('6')
        this.setState({ isFlag: 0 })
        console.log('7')

        console.log('8')
        // this.date2();
        // this.setState({ tasks: this.state.tasks});
        localStorage.setItem("taskList", JSON.stringify(this.state.tasks))
        console.log('9')
        console.log(this.state.isFlag)

    }
    date2 = () => {
        const tasks = [...this.state.tasks];
        const datePicker = document.getElementById("date-picker").value

        this.setState({ date: datePicker })
        //localStorage.setItem("taskList",JSON.stringify(this.state.tasks)) 
        JSON.parse(localStorage.getItem('taskList'))

    }

    // handleEdit = (id) => {

    //     let mapped = this.state.tasks.map((task, index) => {

    //       if (index == id) {
    //         task.strike = !task.strike

    //       }
    //       return task;

    //     });
    //     this.setState({ items: mapped });
    //   }
    // componentDidMount() {
    //     const allTasks = localStorage.getItem("taskList");
    //     this.setState({ tasks: JSON.parse(allTasks) });
    // }


    render() {

        const { errors } = this.state;
        const storageData = JSON.parse(localStorage.getItem('taskList'));
        //  console.log(storageData)

        return (
            <div>

                <Container className="container " style={{ backgroundColor: "#f9f7f7" }}>
                    <Container className="text-center" >
                        <h3 className="display-4 text-center text-uppercase">Todo list</h3>
                        <h5 className="display-4  text-uppercase">Add  To Do</h5>
                        <Row>
                            <Col className="container text-center col-10 mx-auto col-md-8 mt-5">
                                <Form onSubmit={this.addTask} >

                                    <Row>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <input type="text" name="task" id="taskName" className="form-control border-0 " placeholder="Add to do" onChange={this.handler} />
                                            {errors.task.length > 0 && <span style={{ color: 'red' }}>{errors.task}</span>}
                                        </Col>
                                    </Row>
                                    <Row>

                                    </Row><br />
                                    <Row>
                                        <Col>
                                            <input type="number" name="priority" id="dateTask" className="form-control  border-0" placeholder="Priority" onChange={this.handler} />
                                            {errors.priority.length > 0 && <span style={{ color: 'red' }}>{errors.priority}</span>}
                                        </Col>

                                    </Row><br />
                                    <Row>
                                        <Col>
                                            <DatePickerComponent placeholder="ENTER DATE" width="700px"
                                                format="dd-MMM-yy" onChange={this.date2} id="date-picker"></DatePickerComponent>
                                        </Col>
                                    </Row>


                                    <br />
                                    <input type="submit" value="ADD" onClick="SubmitForm()" className="btn btn-info mt-3" />
                                </Form>
                            </Col>


                        </Row>
                    </Container>

                    <Container className="mt-5">
                        <Row>
                            <Col className="container">
                                <table className="table table-borderless container table-hover text-center " style={{ width: "1000px" }}>
                                    <thead className="bg-dark text-white">
                                        <tr>
                                            <td className="col-2">No</td>
                                            <td className="col-3">TITLE</td>
                                            <td className="col-3">PRIORITY</td>
                                            <td colSpan="3">ACTION</td>
                                            <td>DATE</td>
                                        </tr>
                                    </thead>


                                    {this.state.tasks.map((pro, index) =>

                                        <tr key={index}>
                                            <td className="col-2">{index + 1}</td>

                                            <td>{ReactHtmlParser(pro.task)}</td>
                                            <td className="col-3">{pro.priority}</td>

                                            <td><button className="btn btn-outline-success" onClick={() => this.deleteTask(index)} > <i class="fa fa-times" aria-hidden="true"></i> </button></td>
                                            <td><button className="btn btn-outline-danger" onClick={() => this.editTask(index)} > <i class="fa fa-check" aria-hidden="true"></i> </button></td>
                                            <td><button className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => this.update2(index)}>Update</button></td>
                                            <td >{pro.date}</td>
                                        </tr>
                                    )}


                                </table>
                            </Col>
                        </Row>


                    </Container>
                    {this.state.isFlag == 1 ?
                        <div class="container text-center mt-5 bg-light">
                            {console.log(this.state.isFlag)}
                            <div class="modal" id="myModal">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">UPDATE DATA</h5>
                                            <button type="button" class=" btn btn-close btn-outline-dark" data-bs-dismiss="modal">END</button>
                                        </div>


                                        <div class="modal-body">
                                            <form>

                                                <div class="mb-3">
                                                    <label class="form-label required">TASK</label>
                                                    <input type="text" id="text1" class="form-control" />
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label required">PRIORITY</label>
                                                    <input type="number" id="text2" class="form-control" />
                                                </div>
                                                <div className="text-dark">
                                                    <label class="form-label required">DATE</label>
                                                    <DatePickerComponent placeholder="ENTER DATE" width="460px"
                                                        format="dd-MMM-yy" id="date-picker1"></DatePickerComponent>
                                                </div>

                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="submit" class="btn btn-outline-info" data-bs-dismiss="modal" onClick={() => this.updatetask()}>Submit</button>

                                            {/* <button type="button" class="btn btn-outline-dark" onChange={this.date2}>Update Date</button> */}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        : ''}
                </Container>

            </div>
        )
    }
}

export default Temp2;
