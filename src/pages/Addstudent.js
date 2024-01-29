import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

class AddStudent extends Component {
  state = {
    name: '',
    course: '',
    email: '',
    phone: '',
    validate_err: {}, // 'validate_err' olarak tanımlanmış
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  saveStudent = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/api/add-student', this.state);

      if (res.data.status === 200) {
        Swal.fire({
          title: 'Success',
          text: res.data.message,
          icon: 'success',
          button: 'OK!',
        });

        this.props.history.push('/');
        this.setState({
          name: '',
          course: '',
          email: '',
          phone: '',
          validate_err: {}, // Hata durumunda temizlenmiş
        });
      } else {
        this.setState({
          validate_err: res.data.validate_err,
        });
      }
    } catch (error) {
      console.error("Bir hata oluştu:", error);
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  Add Students
                  <Link to={'/'} className="btn btn-primary btn-sm float-end">
                    Back
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={this.saveStudent}>
                  <div className="form-group mb-3">
                    <label>Student Name</label>
                    <input type="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control" />
                    <span className="text-danger">{this.state.validate_err.name}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Student Course</label>
                    <input type="text" name="course" onChange={this.handleInput} value={this.state.course} className="form-control" />
                    <span className="text-danger">{this.state.validate_err.course}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Student Email</label>
                    <input type="text" name="email" onChange={this.handleInput} value={this.state.email} className="form-control" />
                    <span className="text-danger">{this.state.validate_err.email}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Student Phone</label>
                    <input type="text" name="phone" onChange={this.handleInput} value={this.state.phone} className="form-control" />
                    <span className="text-danger">{this.state.validate_err.phone}</span>
                  </div>

                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary">
                      Save Student
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddStudent;