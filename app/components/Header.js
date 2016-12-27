var React = require('react');
var ReactDOM = require('react-dom');

const ReactBootstrap = require('react-bootstrap/lib/index.js');  // ok
const PageHeader =  ReactBootstrap.PageHeader;


var Header = React.createClass({
  render : function(){
    return (
	    	<PageHeader>Spending Tracker 
	    		<small> Track your spending every day</small>
	    	</PageHeader>
	    );
  }
});
module.exports = Header;