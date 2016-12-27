
var React = require('react');
var ReactDOM = require('react-dom');


const ReactBootstrap = require('react-bootstrap/lib/index.js');  // ok
const Grid = ReactBootstrap.Grid; 
const Col = ReactBootstrap.Col;
const Row = ReactBootstrap.Row;

var Header = require('./components/Header');
var SpendingForm = require('./components/SpendingForm');
var SpendingSummary = require('./components/SpendingSummary');

var catgory = [
        {catname: "Food",value:"F",color:"#31708f"},
        {catname: "Clothes",value:"C",color:"#3c763d"},
        {catname: "Traffic",value:"T",color:"#a94442"}
    ];


var App = React.createClass({
  	
  	getInitialState:function(){
    	return {data: []};
 	 },
  	loadDataFromLocalStorage:function(){
		var spendingDataArray= localStorage["spendingdata"];
	 	var historySpendingData = [];
	    if(spendingDataArray){
	    	spendingDataArray = JSON.parse(spendingDataArray);
	    	for(var prop in spendingDataArray){
	            var spendingItem = JSON.parse(localStorage["spendingdata_"+spendingDataArray[prop]]);
	           
	            var spendingItemObj = {
	              "id":spendingItem.id,
	              "date":spendingItem.date,
	              "amount":spendingItem.amount,
	              "catgory":spendingItem.catgory,
	              "remark":spendingItem.remark
	            };
	            historySpendingData.push(spendingItemObj);
	        }
	       
	    }

	    this.setState({data: historySpendingData});
	    console.log('loadDataFromLocalStorage');

	}, 
	componentDidMount: function() {
        this.loadDataFromLocalStorage();
    },
    componentWillUpdate: function (nextProps, nextState) {
    	
    },
    onFormSubmit:function(formdata){
    	console.log("onFormSubmit");
    	formdata.id = new Date().getTime(); 
        var key = "spendingdata_"+formdata.id;

    	//TODO : 用localstorage 儲存
    	//1. 儲存spending內容
        localStorage.setItem(key,JSON.stringify(formdata));
        //2. 更新spending data 索引表
        var spendingDataArray = localStorage["spendingdata"];
        if(!spendingDataArray){
            spendingDataArray = [];
        }else{
        	spendingDataArray = JSON.parse(spendingDataArray);
        }
        spendingDataArray.push(formdata.id);
        localStorage.setItem("spendingdata",JSON.stringify(spendingDataArray));

		var historySpendingData = this.state.data;
        historySpendingData = historySpendingData.concat([formdata]);
        this.setState({data: historySpendingData});
          
    },
    onDataDelete:function(item){
    	
    	var itemId = item.itemid;
    	console.log("onDataDelete:"+itemId);
	   
	    //TO-DO-1 : 刪除localstorage的資料
	    localStorage.removeItem("spendingdata_"+itemId);
	    //TO-DO-2 : 更新spending data 索引表
	    var spendingDataArray = localStorage["spendingdata"];
	    if(!spendingDataArray){
	      spendingDataArray = [];
	    }else{
	      spendingDataArray = JSON.parse(spendingDataArray);
	    }
	    var index = spendingDataArray.indexOf(parseInt(itemId));
	    if(index > -1){
	      spendingDataArray.splice(index,1);
	      localStorage.setItem("spendingdata",JSON.stringify(spendingDataArray));
	    }
	    this.setState({closemodal: true});
	    this.loadDataFromLocalStorage();
    },
    onDataEdit:function(formdata){
    	console.log("onDataEdit");
    	console.dir(formdata);
    	var itemId = formdata.id;
    	var key = "spendingdata_"+itemId;
    	localStorage.setItem(key,JSON.stringify(formdata));
    	this.loadDataFromLocalStorage();
    },
  	render : function(){
  		return (
	  		<Grid>
			    <Header />
			    <Row className="show-grid">
			      <Col md={6}>
			      	<SpendingSummary 
			      		catgory={catgory} 
			      		data={this.state.data}
			      		onDataDelete={this.onDataDelete}
			      		onDataEdit={this.onDataEdit}
			      		showmodal={this.showmodal}
			      	/>
			      </Col>
			      <Col md={6}>
			      	<SpendingForm 
			      		catgory={catgory} 
			      		onFormSubmit={this.onFormSubmit}
			      	/>
			      </Col>
			    </Row>
			</Grid>
  		);
  	}	
});

ReactDOM.render(
	<App />,
	document.getElementById('app')
	);



