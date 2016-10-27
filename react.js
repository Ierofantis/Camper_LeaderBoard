var App = React.createClass({

  getInitialState: function() {
    return {
      showMe: false,
      c: [],
      c1: []
    }
  },

  componentDidMount: function() {

    var th = this;
    this.serverRequest =
      axios.get(this.props.source)
      .then(function(result) {
        th.setState({
          c: result.data
        });
      })

    var th = this;
    this.serverRequest =
      axios.get(this.props.source2)
      .then(function(result) {
        th.setState({
          c1: result.data
        });
      })
  },
  buttonclick: function() {
    this.setState({
      showMe: true
    });
  },
  buttonclick2: function() {
    this.setState({
      showMe: false
    });
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    if (!this.state.showMe)
      return (

        <div >
        <h1>Camper Leaderboard</h1>  
          <div className="col-md-2 col-md-offset-5">
         <button className="btn btn-info" onClick= {this.buttonclick}>ALL</button>
         <button  className="btn btn-danger" onClick= {this.buttonclick2}>RECENT</button>
          </div>
         
  {this.state.c.map(function(camper) {
          return (
            <div>
                <div className="row">                 
           <div className="col-md-12">  
          <tr>
        <td className="count"></td>  
        <td><img src={camper.img} /></td>
        <td><a href={"https://freecodecamp.com/" + camper.username} target="_blank">{camper.username}</a></td>
              Recent 
        <td>{camper.recent}</td>
             Alltime
        <td>{camper.alltime}</td>
       </tr> 
              </div>
            </div>
           </div>
            );
        })}
      </div>
      )
    else {
      return (

        <div>
        <h1>Camper Leaderboard</h1>  
          <div className="col-md-2 col-md-offset-5">
         <button className="btn btn-info" onClick= {this.buttonclick}>ALL</button>
         <button className="btn btn-danger" onClick= {this.buttonclick2}>RECENT</button>
         </div>
  {this.state.c1.map(function(camper) {
          return (
            <div>
                <div className="row">                 
           <div className="col-md-12">  
          <tr>
        <td className="count"></td>  
        <td><img src={camper.img} /></td>
        <td><a href={"https://freecodecamp.com/" + camper.username} target="_blank">{camper.username}</a></td>
              Recent 
        <td>{camper.recent}</td>
             Alltime
        <td>{camper.alltime}</td>
       </tr> 
              </div>
            </div>
           </div>
            );
        })}
      </div>
      )
    }
  }
});

ReactDOM.render(<App source="https://fcctop100.herokuapp.com/api/fccusers/top/recent" source2="https://fcctop100.herokuapp.com/api/fccusers/top/alltime" />, document.querySelector("#container"));