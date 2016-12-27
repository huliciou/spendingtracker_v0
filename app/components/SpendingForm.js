var React = require('react');
var ReactDOM = require('react-dom');

const ReactBootstrap = require('react-bootstrap/lib/index.js');  // ok
const Col = ReactBootstrap.Col;
const Button = ReactBootstrap.Button;
const Form = ReactBootstrap.Form;
const FormGroup = ReactBootstrap.FormGroup;
const InputGroup =  ReactBootstrap.InputGroup;
const FormControl = ReactBootstrap.FormControl;
const ControlLabel = ReactBootstrap.ControlLabel;
const HelpBlock = ReactBootstrap.HelpBlock;


function FieldGroup({ id,label,type,placeholder,value,onChange,validation,helptext}) {
  return (
    <FormGroup controlId={id} validationState={validation}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl 
        type={type} 
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
        
       />
      <HelpBlock>{helptext}</HelpBlock>
    </FormGroup>

  );
}
var SpendingForm = React.createClass({
  //TO-DO : 
  //select 載入選項
  //TO-DO : 
  //送出form 後存在localstorage裡
  getInitialState : function() {
    var utcDate = new Date().toJSON().slice(0,10);
    return {  date: utcDate,
              amount:0,
              catgory:"0",
              remark:'',
              validate_date:null,
              validate_amount:null,
              validate_cat:null,
              helptext_amount:"",
              helptext_cat:""
           };
    
  },
  handleDateOnChange: function(e) {
    this.setState({date: e.target.value});
  },
  handleAmountOnChange:function(e) {
    this.setState({amount: e.target.value});
  },
  handleCatgoryOnChange:function(e) {
    this.setState({catgory: e.target.value});
  },
  handleRemarkOnChange:function(e) {
    this.setState({remark: e.target.value});
  },
  handleSubmit: function(e) {
    
    e.preventDefault();
    var date = this.state.date;
    var amount = this.state.amount;
    var catgory = this.state.catgory;
    var remark = this.state.remark.trim();

    //TO-DO :  表單驗證
    if(!date){
      this.setState({
            validate_date:"error"
      });
    }else{
      this.setState({
            validate_date:null      });
    }
    if (!amount) {
      this.setState({
        validate_amount:"error",
        helptext_amount:"Required!"
      });
    }else{
      this.setState({
        validate_amount:null,
        helptext_amount:""
      });
    }
    if (!catgory || catgory=="0") {
       this.setState({
          validate_cat:"error",
          helptext_cat:"Required!"
        });
    }else{
      this.setState({
        validate_cat:null,
        helptext_cat:""
      });
    }
    if(!date || !amount  || !catgory || catgory=="0"){
      return;
    }
    
    //TO-DO : 將表單送到localstarage 儲存  
    this.props.onFormSubmit({date:date,amount: amount, catgory: catgory,remark:remark});
    // TO-DO: reset 表單
    var utcDate = new Date().toJSON().slice(0,10);
    this.setState({
            date: utcDate,
            amount:0,
            catgory:'0',
            remark:'',
            validate_date:null,
            validate_amount:null,
            validate_cat:null,
            helptext_amount:"",
            helptext_cat:""
          });

  },
  render : function(){
    var i = 1;
    var catgoryOptions = this.props.catgory.map(function(options) {
        i++;
        return ( 
          <option key={i} 
                  value={options.value}>
            {options.catname}
          </option>
        );
      });
    return (
	    	<Form onSubmit={this.handleSubmit}>
          <h3>NEW + </h3>
          <FieldGroup
            id="date"
            type="date"
            label="Date : "
            value={this.state.date}
            onChange={this.handleDateOnChange}
            validation={this.state.validate_date}
          />
          <FieldGroup
            id="amount"
            type="text"
            label="Amount : "
            placeholder="Enter amount..."
            value={this.state.amount}
            onChange={this.handleAmountOnChange}
            validation={this.state.validate_amount}
            helptext={this.state.helptext_amount}
          />
         <FormGroup controlId="category"  validationState={this.state.validate_cat}>
            <ControlLabel>Catgory :</ControlLabel>
            <FormControl 
              componentClass="select" 
              placeholder="select"
              value={this.state.catgory}
              onChange={this.handleCatgoryOnChange}
              >
             <option value="0">select</option>
              {catgoryOptions}
            </FormControl>
            <HelpBlock>{this.state.helptext_cat}</HelpBlock>
          </FormGroup>
         
           <FormGroup controlId="remark">
              <ControlLabel>Remark : </ControlLabel>
              <FormControl 
                componentClass="textarea" 
                placeholder="Enter remark..."
                value={this.state.remark} 
                onChange={this.handleRemarkOnChange} />
            </FormGroup>
            <Button type="submit" bsStyle="primary">
              Save
            </Button>
        </Form>
	    );
  }
});
module.exports = SpendingForm;