var React = require('react');
var ReactDOM = require('react-dom');

const ReactBootstrap = require('react-bootstrap/lib/index.js');  // ok
const Tabs =  ReactBootstrap.Tabs;
const Tab =  ReactBootstrap.Tab;
const Grid = ReactBootstrap.Grid; 
const Col = ReactBootstrap.Col;
const Row = ReactBootstrap.Row;

var SpendingList = require('./SpendingList');
var SpendingChart = require('./SpendingChart');
var Filter = require('./Filter');


var SpendingSummary = React.createClass({
  getInitialState : function() {
    var utcDate = new Date().toJSON().slice(0,10);
    return {  
          period:"D" ,
          catfilter:["F","C","T"],
          from:utcDate,
          to:""
        };
  },
  onCheckboxChange:function(catgory){
    var catgory = catgory.catgory;
    var catfilter = this.state.catfilter;
    var index = catfilter.indexOf(catgory);
  
    if(index == -1){
      catfilter.push(catgory); 
    }else{
      catfilter.splice(index,1);
    }
    this.setState({catfilter:catfilter});
   
  },
  onFilterSelect:function(period){
    var period = period.period;
    this.setState({period:period.period});
    //計算日期區間
    var today = new Date();
    var date = today.getDate();
    var day = today.getDay();
    var m= today.getMonth();
    var bMonthArr = [1,3,5,7,8,10,12];
    var sMonthArr = [4,6,9,11];
    
    switch(period){
      case "W":
       
        today.setDate(date-day);
        var  firstDayOfWeek = today.toJSON().slice(0,10);
        today.setDate(date+(6-day));
        var lastDayOfWeek = today.toJSON().slice(0,10);
        this.setState({from:firstDayOfWeek, to:lastDayOfWeek});
        break;
      case "M":
        today.setDate(1);
        var  firstDayOfMonth = today.toJSON().slice(0,10);
        m++;
        var index_b = bMonthArr.indexOf(m);
        var index_s = sMonthArr.indexOf(m);

        if(index_b > -1){
          today.setDate(31);
        }else if(index_s > -1){
          today.setDate(30);
        }else{
          today.setDate(28);
        }
        var lastDayOfWeek = today.toJSON().slice(0,10);
        this.setState({from:firstDayOfMonth, to:lastDayOfWeek});
        
        break;
      case "D":
        var date = today.toJSON().slice(0,10);
        this.setState({from:date, to:""});
        break;
      case "A":
        this.setState({from:"", to:""});
    }

  },
  render : function(){
    return (
	    	<div>
          <h3>
            SUMMARY
          </h3>
          <Filter 
            catgory={this.props.catgory} 
            onFilterSelect={this.onFilterSelect} 
            onCheckboxChange = {this.onCheckboxChange} 
            catfilter = {this.state.catfilter}
            from={this.state.from}
            to={this.state.to}/>
           <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
              <Tab eventKey={1} title="List">
                <SpendingList 
                  data={this.props.data} 
                  catgory={this.props.catgory} 
                  catfilter = {this.state.catfilter}
                  from={this.state.from}
                  to={this.state.to}
                  onDataDelete={this.props.onDataDelete}
                  onDataEdit={this.props.onDataEdit}
                  showmodal={this.props.showmodal}
                 
                />
              </Tab>
              <Tab eventKey={2} title="Chart"> 
                <SpendingChart />
              </Tab>
            </Tabs>
        </div> 
	    );
  }
});
module.exports = SpendingSummary;