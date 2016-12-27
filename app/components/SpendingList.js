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
const Label = ReactBootstrap.Label;
const Modal = ReactBootstrap.Modal;
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


var EditModal = React.createClass({
  getInitialState() {
    return { 
      showModal:false,
      id:"",
      date: "",
      amount:0,
      catgory:'0',
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
  close() {
    this.setState({ showModal: false });
  },
  open() {
    this.setState({ showModal: true });
  },
  delete:function(e){
    var itemId = this.state.id;
    this.props.onDataDelete({itemid : itemId});
  },
  edit:function(e){
    e.preventDefault();
    var itemId = parseInt(this.state.id);
    var date = this.state.date;
    var amount = this.state.amount;
    var catgory = this.state.catgory;
    var remark = this.state.remark.trim();
    console.log('catgory:'+catgory);
    this.props.onDataEdit({ id : itemId,
                            date:date,
                            amount:amount,
                            catgory:catgory,
                            remark:remark});
  },
  componentWillReceiveProps:function(nextProps){
    //console.log('componentWillReceiveProps:'+nextProps.showModal);
    if(nextProps.showModal){
      //TO-DO : 這裡從localstorage 取值
      var editData = JSON.parse(localStorage["spendingdata_"+nextProps.editId]);
      console.log(editData);
      this.setState({ 
        id:nextProps.editId,
        date: editData.date,
        amount:editData.amount,
        catgory:editData.catgory,
        remark:editData.remark
      });
      this.open();
    }else{
      this.close();
    }
  },
  render:function(){
    var btnStyle = {
      "textAlign":"center"
    }
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
          <Modal 
            bsSize="small" 
            aria-labelledby="contained-modal-title-sm"
            show={this.state.showModal} 
            onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>
                Detail-Edit 
                <Button id={this.state.id} bsStyle="link" onClick={this.delete}>
                  <Glyphicon id={this.state.id} glyph="trash" />
                </Button>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.edit}>
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
                <div style={btnStyle}>
                  <Button type="submit" bsStyle="primary">
                    Save
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
      );
  }
});



function SpendingItem({ id,remark,catgory,tagcolor,amount,date,doubleClick}) {
    
    var ListItemStyle = {
      fontSize:"1.2em"
    };
    var ItemStyle = {
      fontWeight:"bold"
    };
    var AmountStyle = {
      float:"right"
    };
    var DateStyle = {
      fontSize:"0.8em",
      fontWeight:"light",
      color:"#777"
    };
    var TagStyle = {};
    var tagcolor = {tagcolor};
    TagStyle.backgroundColor = tagcolor.tagcolor;
    return (
       <ListGroupItem key={id}>
          <div id={id} style={ListItemStyle} onDoubleClick={doubleClick}>
            <Label id={id} style={TagStyle}> {catgory}</Label>
            <span id={id} style={ItemStyle}> {remark}</span>
            <span id={id} style={AmountStyle}>${amount}</span>
          </div>
          <span style={DateStyle}>{date}</span>

        </ListGroupItem>

    );
}


var SpendingList = React.createClass({
  //TO-DO : 
  //顯示資料 (依條件)
  getInitialState:function(){
    return {
      editId:"",
      editDate:"",
      editAmount:0,
      editCatgory:"",
      editRemark:"",
      showmodal:false
    };
  },
  handleDoubleClick:function(e){
    console.log("handleDoubleClick");
    this.setState({ showmodal: true, editId:e.target.id});
  },
  componentWillReceiveProps:function(){
    console.log("componentWillReceiveProps");
    this.setState({ showmodal: false,
              editDate:"",
              editId:"",
              editAmount:0,
              editCatgory:"",
              editRemark:""});
  },
  render : function(){
    var i =0;
    var total=0;
    var catgorys = this.props.catgory;
    var catfilter = this.props.catfilter;
    var periodFrom = this.props.from;
    var periodTo = this.props.to;
    var handleDoubleClick = this.handleDoubleClick;

    var SpendingItems = this.props.data.map(function(item){
      i++;
      var show = false;
      var tagColor = "";
      var tagName = "";
      for(var prop in catgorys){
        var aCatgory = catgorys[prop];
        if(item.catgory == aCatgory['value']){
          tagColor = aCatgory['color'];
          tagName = aCatgory['catname']
        }
        
      }

      if((periodFrom=="" &&  periodTo=="") ||
        (item.date == periodFrom && periodTo=="") ||
        (item.date >=periodFrom && item.date <=periodTo)){

          if(catfilter.indexOf(item.catgory) > -1){
            total = total+parseInt(item.amount);
            show = true;
          }
        
      }
      if(show){
         return (
               <SpendingItem 
                key={item.id} 
                id={item.id} 
                date={item.date} 
                amount={item.amount} 
                catgory={tagName}
                tagcolor={tagColor}
                remark={item.remark}
                doubleClick={handleDoubleClick} 
                />
          );
      }

    });
    var listStyle = {
      marginTop: 10,
      verticalAlign: "baseline"
    };
    return (
          <div style={listStyle}>
            <ListGroup >
              {SpendingItems}
            </ListGroup>
            <h4>Total: ${total}</h4>
            <EditModal 
              catgory={this.props.catgory}
              editDate={this.state.editDate}
              editId={this.state.editId}
              editAmount={this.state.editAmount}
              editCatgory={this.state.editCatgory}
              editRemark={this.state.editRemark}
              onDataDelete={this.props.onDataDelete}
              onDataEdit={this.props.onDataEdit}
              showModal={this.state.showmodal}
            />

          </div>
	    );
  }
});
module.exports = SpendingList;