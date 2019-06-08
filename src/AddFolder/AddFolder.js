import React, { Component } from 'react';
import NotefulForm from '../NotefulForm/NotefulForm';
import NotefulError from '../NotefulError';
import PropTypes from 'prop-types';
import './AddFolder.css';
import { withRouter } from 'react-router-dom';

class AddFolder extends Component {

  state = {
    error: null,
  };

  handleFolderSubmit = e => {
    e.preventDefault()
    const {name} = e.target
    const folder = {
      name: name.value
    }
    const url = 'http://localhost:9090/folders'
    this.setState({ error:null })
    const options = {
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(folder),
}
fetch(url, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later');
        }
        return res.json();
      })
      .then(data => {     
        name.value = ''
        this.props.addNewFolder(data);
        this.props.history.push('/')
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      })
    }

  render() {
    return (
      <section className='AddFolder'>
        <NotefulError>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleFolderSubmit}>
          <div className='field'>
            <label htmlFor='name-input'>
              Name
            </label>
            <input type='text' id='name' name='name'/>
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </NotefulForm>
        </NotefulError>
      </section>
    )
  }
}

AddFolder.propTypes = {
  addNewFolder: PropTypes.func.isRequired,
  folders: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  })) 
};

export default withRouter(AddFolder);