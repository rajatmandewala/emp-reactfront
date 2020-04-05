import React ,{Component} from 'react';
import {FormGroup,Input,Label,Table,Button,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import axios from 'axios';
import './App.css';

class App extends Component{

  state = {
    emp :[],
    newEmpData: {
      id: '',
      empName: ''
    },
    editEmpData: {
      id: '',
      empName: ''
    }
    ,
    newEmpModal : false,
    editEmpModal :false

  }

  UNSAFE_componentWillMount(){
    axios.get('https://springreact.herokuapp.com/emp').then((Response) => {
      this.setState({
        emp: Response.data
      })
    });
    
  }


  toggleNewEmpModal(){
    this.setState({
      newEmpModal : ! this.state.newEmpModal
    });
}

toggleEditEmpModal(){
  this.setState({
    editEmpModal : ! this.state.editEmpModal
  });
}

addEmp(){
  //alert('rajat');
  axios.post('https://springreact.herokuapp.com/emp',this.state.newEmpData).then((Response) => {
  //console.log(Response.data);

  let { emp } = this.state;

  emp.push(Response.data);

  this.setState({ emp,newEmpModal : false, newEmpData: {
    id: '',
    empName: ''
  } });
  });
}

updateEmp(){
  axios.put('https://springreact.herokuapp.com/emp',this.state.editEmpData).then((Response) => {

  this.setState({editEmpModal : false, editEmpData:{
    id: '',
    empName: ''
  }
  });
  this._refreshEmp();
  });
}



 editEmp(id,empName){
   //console.log(id,empName);
    this.setState({
      editEmpData : { id , empName }, editEmpModal : ! this.state.editEmpModal
    });
 }

 _refreshEmp(){

  axios.get('https://springreact.herokuapp.com/emp',this.state.editEmpData).then((Response) => {
    this.setState({
      emp: Response.data
    })
  });
 }


 deleteEmp(id,empName){
   console.log(id,empName);
   axios.delete('https://springreact.herokuapp.com/emp/'+id).then((Response) => {
  this._refreshEmp();
   });
 }

  render(){

    let emps=this.state.emp.map((emp) => {

      return(
        <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.empName}</td>
              <td>
                <Button color="success" size="sm" className="mr-2" onClick={this.editEmp.bind(this,emp.id,emp.empName)}>Edit</Button>
                <Button color="danger" size="sm" onClick={this.deleteEmp.bind(this,emp.id,emp.empName)}>Delete</Button>
              </td>
            </tr>
      )

    });


    return (
      <div className="App container">

          <h1>Employee Management</h1>

        <Button className="my-3" color="primary" onClick={this.toggleNewEmpModal.bind(this)}>Add Employee</Button>
 
        <Modal isOpen={this.state.newEmpModal} toggle={this.toggleNewEmpModal.bind(this)} >
          <ModalHeader toggle={this.toggleNewEmpModal.bind(this)}>Add Employee</ModalHeader>
          <ModalBody>
            
            <FormGroup>
              <Label for="empId">Emp ID</Label>
              <Input type="text" value={this.state.newEmpData.id} onChange={ (e) =>{

                let { newEmpData }=this.state;

                newEmpData.id=e.target.value;

                this.setState({ newEmpData });
              }


              } />
            </FormGroup>

            <FormGroup>
              <Label for="empName">Emp Name</Label>
              <Input type="text" value={this.state.newEmpData.empName} onChange={ (e)=> {

                let { newEmpData } =this.state;

                newEmpData.empName=e.target.value;

                this.setState({ newEmpData });
              }

              } />
            </FormGroup>


          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addEmp.bind(this)}>Add</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewEmpModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.editEmpModal} toggle={this.toggleEditEmpModal.bind(this)} >
          <ModalHeader toggle={this.toggleEditEmpModal.bind(this)}>Edit Employee</ModalHeader>
          <ModalBody>
            
            <FormGroup>
              <Label for="empId">Emp ID</Label>
              <Input type="text" value={this.state.editEmpData.id} onChange={ (e) =>{

                let { editEmpData }=this.state;

                editEmpData.id=e.target.value;

                this.setState({ editEmpData });
              }


              } />
            </FormGroup>

            <FormGroup>
              <Label for="empName">Emp Name</Label>
              <Input type="text" value={this.state.editEmpData.empName} onChange={ (e)=> {

                let { editEmpData } =this.state;

                editEmpData.empName=e.target.value;

                this.setState({ editEmpData });
              }

              } />
            </FormGroup>


          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateEmp.bind(this)}>Update</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditEmpModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Actions</th>            
            </tr>
          </thead>
            <tbody>
              {emps}
            </tbody>
  
        </Table>
        
  
      </div>
    );

  }  

}

export default App;