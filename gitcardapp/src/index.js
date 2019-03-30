import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

//a commit test
const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
  </div>
);

class Card extends Component {
  render() {
    const profile = this.props;
    return (
      <div>
        <div className="github-profile">
          <img className="profile-pic" src={profile.avatar_url}/>
          <div className="info">
            <div className="name"><b>{profile.name}</b></div>
            <div className="company">{profile.company}</div>
          </div>
        </div>
      </div>
    );
  }
}

class Form extends Component {
  state = {userInput:'',}
  handleClick = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userInput}`);
    this.props.onSubmit(resp.data)
    this.setState({userInput: ''})
  }
  render(){
    return(
      <form className="form-design" action="" onSubmit={this.handleClick} >
        <input type="text"
          placeholder="Github username"
          value={this.state.userInput}
          onChange={event => this.setState({userInput: event.target.value})}/>
        <button>Add Card</button>
      </form>
    );
  }
}

class App extends Component{
  // constructor(props){
  //   super(props);
  //   this.state={
  //     profiles: testData,
  //   }
  // }
  state = {
    profiles: []
  }
  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData],
    }))
  };
  render(){
    return (
      <div>
        <Form onSubmit={this.addNewProfile}/>
        <CardList profiles={this.state.profiles}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
