var React = require('react');
var ReactDOM = require('react-dom');

const ReactBootstrap = require('react-bootstrap/lib/index.js');  // ok
const ListGroup = ReactBootstrap.ListGroup;
const ListGroupItem = ReactBootstrap.ListGroupItem;
const ButtonToolbar = ReactBootstrap.ButtonToolbar;
const ButtonGroup = ReactBootstrap.ButtonGroup;
const Button = ReactBootstrap.Button;
const Glyphicon = ReactBootstrap.Glyphicon;
const Collapse = ReactBootstrap.Collapse;
const Well = ReactBootstrap.Well;
const Checkbox = ReactBootstrap.Checkbox;

var Info = React.createClass({
  render:function(){
    var InfoStyle={
      display: "inline-block",
      margin: "5px 5px 10px"
    }
    var sign = this.props.to ==""?"":"~";
    return (
        <div style={InfoStyle}>
          <strong>Period : </strong> {this.props.from}{sign}{this.props.to}
        </div>
    );
  }
});

var CatgoryCheckBox = React.createClass({
  render:function(){
    return ( 
          <Checkbox 
            key={this.props.id} 
            name="filter-checkbox" 
            value={this.props.value} 
            onChange={this.props.onChange}
            checked={this.props.checked}
            inline 
            >
            {this.props.catname}
          </Checkbox>
        );
  }
});


var Filter = React.createClass({
  //TO-DO
  //改變顯示資料 (list)
  //改變期間資訊
  //改變總金額

  getInitialState : function() {
    return {  
      open: false,
      checked:true
    };
  },
  open :function(){
    var toggle = this.state.open == true ? false:true;
    this.setState({ open: toggle });
  },
  handleOnClick:function(e){
    this.props.onFilterSelect({ period: e.target.value });
  },
  handleOnchange:function(e){
    console.log(e.target.value);
    this.props.onCheckboxChange({ catgory: e.target.value });
    var toggle = this.state.open == true ? false:true;
  },
  render : function(){
    var FilterStyle = {
      margin:"0px 0px 0px 10px",
    };
    var ButtonGroupCustomStyle = {
      float:"right",
      margin:"5px 0px 10px 0px",
      display:"inline"
    };
    var i = 0;
    var handleOnchange = this.handleOnchange;
    var catfilter = this.props.catfilter;
    var filterChekbox = this.props.catgory.map(function(options) {
        i++;
        var val = options.value;
        var checked = true;
        if(catfilter.indexOf(val)== -1){
          checked =false;
        }
        return ( 
          <CatgoryCheckBox 
            key={i}
            id={i}
            value={options.value} 
            onChange={handleOnchange}
            catname={options.catname}
            checked = {checked}
          />
        );
      });
    return (
        <div >
           <ButtonToolbar>
              <Info from={this.props.from} to={this.props.to}/>
              <ButtonGroup style={ButtonGroupCustomStyle}>
                <Button bsSize="xsmall" value="A" onClick={this.handleOnClick}>ALL</Button>
                <Button bsSize="xsmall" value="D" onClick={this.handleOnClick}>Day</Button>
                <Button bsSize="xsmall" value="W" onClick={this.handleOnClick}>Week</Button>
                <Button bsSize="xsmall" value="M" onClick={this.handleOnClick}>Month</Button>
                <Button style={FilterStyle} bsSize="xsmall" onClick={this.open}>
                   <Glyphicon glyph="filter" />
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          
            <Collapse in={this.state.open}>
                <div>
                  <Well>
                    {filterChekbox}
                  </Well>
                </div>
            </Collapse>
        </div>
      );
  }
});

module.exports = Filter;