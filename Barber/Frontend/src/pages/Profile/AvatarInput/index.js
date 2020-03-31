import React, { Component } from 'react';

import api from '../../../services/api';

import { Container } from './styles';

export default class AvatarInput extends Component {

  state = {
    avatar_url: '',
    
}

  componentDidMount() {
    const avatar_url = localStorage.getItem('save_avatar_url');

    if (avatar_url) {
      this.setState({
        avatar_url: JSON.parse(avatar_url),
      });
    }
   
  }

  componentDidUpdate(_, prevState) {
    const { avatar_url } = this.state;

    if (prevState.avatar_url !== avatar_url) {
      localStorage.setItem('save_avatar_url', JSON.stringify(avatar_url));
    }

  }

  handleChange = async e => {
 
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { path } = response.data.avatar;

   this.setState({
     avatar_url: path,
   })
  }


  render() {
    const {avatar_url} = this.state

    return (
      <Container>
        <label htmlFor="avatar">
          <img
            src={
              avatar_url || 
              'https://api.adorable.io/avatars/48/abott@adorable.png'
            }
            alt="avatar"
          />
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={this.handleChange}
          />
        </label>
      </Container>
    );
  }
}
