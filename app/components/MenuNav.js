var React = require('react');
var ReactDOM = require('react-dom');


var ReactBootstrap = require('react-bootstrap/lib/index.js');  // ok

var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;


var MenuNav = React.createClass({
  render : function(){
    return (
	    	<Nav bsStyle="pills" stacked activeKey={1} >
			    <NavItem eventKey={1} href="/home">NavItem 1 content</NavItem>
			    <NavItem eventKey={2} title="Item">NavItem 2 content</NavItem>
			    <NavItem eventKey={3} disabled>NavItem 3 content</NavItem>
			</Nav>
	    );
  }
});
module.exports = MenuNav;