import React, { Component } from 'react';
import './App.css';

let orderOfStates = [];
let value;
let universalityMessage = "";

const states = [
                'INITIAL_STATE',          //0
                'RECEIVED_ORDER',         //1
                'VERIFY_ORDER',           //2
                'ORDER_VERIFIED',         //3
                'ORDER_REJECTED',         //4
                'ADDRESS_STORED',         //5
                'INVOICE_CREATED',        //6
                'INVOICE_SEND',           //7
                'PAYMENT_RECEIVED',       //8
                'PACKAGE_ASSAMBELED',     //9
                'PACKAGE_SEND',           //10
                'REMOVED_CONTACT_',       //11
                'ORDER_COMPLETED',        //12
                'TWO_WEEKS_PAST',         //13
                'REMINDER_SEND',          //14
                'REMINDER_REACHED',       //15
                'SEND_CANCELLATION',      //16
                'REMOVED_CONTACT',        //17
                'ORDER_CANCELLED',        //18
                'TWO_WEEKS_PAST_',        //19
                'REJECT_ORDER'            //20
                ];

class App extends Component {
  state = { loading: true, drizzleState: null, oSBPDataKey: undefined};
 
  componentDidMount() {
    const { drizzle } = this.props;
    this.unsubscribe = drizzle.store.subscribe(() => {

      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState, oSBPDataKey:this.state.oSBPDataKey });
      }
    });
	//drizzel needs some time to load everything so we have to wait
    setTimeout(() => this.initialize(drizzle), 5000); 
  }

  compomentWillUnmount() {
    this.unsubscribe();
  }

  initialize = (drizzle) => {
    const oSBP = drizzle.contracts.OnlineShopBusinessProcess;
    const oSBPDataKey = oSBP.methods["state"].cacheCall();
    this.setState({ loading : this.state.loading, drizzleState: this.state.drizzleState, oSBPDataKey: oSBPDataKey});
    this.startComplianceChecker();
  }

  //catch the enterpress after the user entered the value in the textfield
  handleKeyDown = e => {
    if (e.keyCode === 13) {
      value = e.target.value;
      this.activateReceiveOrder();
    }
  };

  /*collection of functions to handle clicks on the BPMN
   *interact with the blockchain to activate a state change
   *wait for the blockchain to update and start the loging for the new state
  */
  activateReceiveOrder = () => {
    const { drizzle } = this.props;
    const oSBP = drizzle.contracts.OnlineShopBusinessProcess;
    oSBP.methods["receiveOrder"].cacheSend(value);
    setTimeout(this.logState,500);    
  }

  activateBeginVerfiyProcess = () => {
    const { drizzle } = this.props;
    const oSBP = drizzle.contracts.OnlineShopBusinessProcess;
    oSBP.methods["beginVerifyProcess"].cacheSend();
    setTimeout(this.logState,500);    
  }

  activateVerifyOrder = () => {
    const { drizzle } = this.props;
    const oSBP = drizzle.contracts.OnlineShopBusinessProcess;
    oSBP.methods["verifyOrder"].cacheSend();
    setTimeout(this.logState,500);    
  }

  activateCreateDataEntry = () => {
    const { drizzle } = this.props;
    const oSBP = drizzle.contracts.OnlineShopBusinessProcess;
    const add = "teststreet";
    oSBP.methods["createDataEntry"].cacheSend();
    setTimeout(this.logState,500);
  }

  activateCreateInvoice = () => {
    const { drizzle } = this.props;
    const oSBP = drizzle.contracts.OnlineShopBusinessProcess;
    const invoice = "pleasePayAmmount";
    oSBP.methods["createInvoice"].cacheSend();
    setTimeout(this.logState,500);
  }

  activateSendInvoice = () => {
    const { drizzle } = this.props;
    const oSBP = drizzle.contracts.OnlineShopBusinessProcess;
    oSBP.methods["sendInvoice"].cacheSend();
    setTimeout(this.logState,500);
  }

  activateReceivePayment = () => {
    const { drizzle } = this.props;
    const oSBP = drizzle.contracts.OnlineShopBusinessProcess;
    oSBP.methods["receivePayment"].cacheSend();
    setTimeout(this.logState,500);
  }

  activateAssamblePackage = () => {
    const { drizzle } = this.props;
    const oSBP = drizzle.contracts.OnlineShopBusinessProcess;
    oSBP.methods["assamblePackage"].cacheSend();
    setTimeout(this.logState,500);
  }

  activateSendPackage = () => {
    const { drizzle } = this.props;
    const oSBP = drizzle.contracts.OnlineShopBusinessProcess;
    oSBP.methods["sendPackage"].cacheSend();
    setTimeout(this.logState,500);
  }

  activateRemoveUserDataOnComplete = () => {
    const { drizzle } = this.props;
    const oSBP = drizzle.contracts.OnlineShopBusinessProcess;
    oSBP.methods["deleteData"].cacheSend();
    setTimeout(this.logState,500);    
  }

  activateCompleteOrder = () => {
    const { drizzle } = this.props;
    const oSBP = drizzle.contracts.OnlineShopBusinessProcess;
    oSBP.methods["completeOrder"].cacheSend();
    setTimeout(this.logState,500);    
  }

  activateTwoWeeksPassedEvent = () => {
    const { drizzle } = this.props;
    const oSBP = drizzle.contracts.OnlineShopBusinessProcess;
    oSBP.methods["twoWeeksPassedEvent"].cacheSend();
    setTimeout(this.logState,500);    
  }

  activateSendReminder = () => {
    const { drizzle } = this.props;
    const oSBP = drizzle.contracts.OnlineShopBusinessProcess;
    oSBP.methods["sendReminder"].cacheSend();
    setTimeout(this.logState,500);   
  }

  activateReminderReached = () => {
    const { drizzle } = this.props;
    const oSBP = drizzle.contracts.OnlineShopBusinessProcess;
    oSBP.methods["reminderReached"].cacheSend();
    setTimeout(this.logState,500);    
  }

  activateCancelOrder = () => {
    const { drizzle } = this.props;
    const oSBP = drizzle.contracts.OnlineShopBusinessProcess;
    oSBP.methods["cancelOrder"].cacheSend();
    setTimeout(this.logState,500);    
  }

  activateDeleteDataAbortion = () => {
    const { drizzle } = this.props;
    const oSBP = drizzle.contracts.OnlineShopBusinessProcess;
    oSBP.methods["deleteDataAbortion"].cacheSend();
    setTimeout(this.logState,500);    
  }

  activateFinishCancelation = () => {
    const { drizzle } = this.props;
    const oSBP = drizzle.contracts.OnlineShopBusinessProcess;
    oSBP.methods["finishCancelation"].cacheSend();
    setTimeout(this.logState,500);    
  }

  activateRejectOrder = () => {
    const { drizzle } = this.props;
    const oSBP = drizzle.contracts.OnlineShopBusinessProcess;
    oSBP.methods["rejectOrder"].cacheSend();
    setTimeout(this.logState,500);    
  }

  //function to log the different states
  logState = () => {
    const { OnlineShopBusinessProcess } = this.state.drizzleState.contracts;
    const oSBP = OnlineShopBusinessProcess.state[this.state.oSBPDataKey];
    if(oSBP){
      orderOfStates.push(oSBP.value);
    }
    this.updateChecker();
  }

  /* function to reset everything in 
   * the frontend
   * the BP on the Blockchain
   * the different ComplianceRule smart Contracts
  */
  reset = () => {
    const { drizzle } = this.props;
    const oSBP = drizzle.contracts.OnlineShopBusinessProcess;
    oSBP.methods["reset"].cacheSend();
    orderOfStates = [];
    for(let i = 1; i < states.length; i++){
      if(i == 18 || i == 12 || i == 16 || i==20){
        continue;
      }
      let element = states[i];
      if(i == 14 || i == 7){
        element = states[7];
        this.changeColor(element + '_WEEK', 'white');
        element = element + '_PAY';
      }
      this.changeColor(element, 'white');
    }
    universalityMessage = '';
    const precedenceContract = drizzle.contracts.Precedence;
    const universalityContract = drizzle.contracts.Universality;
    const existenceContract = drizzle.contracts.Existence;
    universalityContract.methods["reset"].cacheSend();
    precedenceContract.methods["reset"].cacheSend();
    existenceContract.methods["reset"].cacheSend();
    document.getElementById("precedence-message").innerHTML = "";
    document.getElementById("universality-message").innerHTML = "";
    document.getElementById("existence-message").innerHTML = "";
    document.getElementById("universality-violation").innerHTML = "";
  }

  //function for reading the current state of the Blockchain and returning it
  returnState = () => {
    if(this.state.oSBPDataKey){
      const { OnlineShopBusinessProcess } = this.state.drizzleState.contracts;
      const oSBP = OnlineShopBusinessProcess.state[this.state.oSBPDataKey];
      if(oSBP){
        let value = oSBP.value;
        if(value != 0 && value != 18 && value != 12 && value != 20){
          if(value == 14){
            value = 7;
          }
          if(value == 16){
            value = 17;
          }
          let element = states[value];
          if(value == 7){
            this.changeColor(element + '_WEEK');
            element = element + '_PAY';
          }
          this.changeColor(element);
        }
        return oSBP.value;
      }
    }
  }

  //function to initialize communication to the compliance rule smart contratcs
  startComplianceChecker = () => {
    const { drizzle } = this.props;
    const universalityContract = drizzle.contracts.Universality;
    const precedenceContract = drizzle.contracts.Precedence;
    const existenceContract = drizzle.contracts.Existence;
    const absenceContract = drizzle.contracts.Absence;

    universalityContract.events.UniversalityEvent({fromBlock: 0}).on('data', event => {

      if(event.returnValues[1]){
        document.getElementById("universality-message").innerHTML = "<img src='./Universality.png'/>";
      }else{
        document.getElementById("universality-message").innerHTML = "";
      }
      if(event.returnValues[2]){
        document.getElementById("universality-violation").innerHTML = "<b>Compliance violation. Stored customer data must be deleted if it is no longer required!</b>";
      }
    });
    precedenceContract.events.PrecedenceEvent({fromBlock: 0}).on('data', event => {

      if(event.returnValues[1]){
        document.getElementById("precedence-message").innerHTML = "<img src='./Precedence.png'/>";
      }else{
        document.getElementById("precedence-message").innerHTML = "";
      }
    });
    existenceContract.events.ExistenceEvent({fromBlock: 0}).on('data', event => {

      if(event.returnValues[1]){
        document.getElementById("existence-message").innerHTML = "<img src='./Existence.png'/>";
      }else{
        document.getElementById("existence-message").innerHTML = "";
      }
    });
    absenceContract.events.AbsenceEvent({fromBlock: 0}).on('data', event => {

      if(event.returnValues[1]){
        document.getElementById("absence-message").innerHTML = "<img src='./Absence.png'/>";
      }else{
        document.getElementById("absence-message").innerHTML = "";
      }
    });
    this.updateChecker();   
  }

  //function to update the compliance rule smart contracs
  updateChecker = () => {
    const { drizzle } = this.props;
    const precedenceContract = drizzle.contracts.Precedence;
    const universalityContract = drizzle.contracts.Universality;
    const existenceContract = drizzle.contracts.Existence;
    const absenceContract = drizzle.contracts.Absence;
    let order;
    for(let i = 0; i < orderOfStates.length; i++){
      if(order){
        order = order + ',' + orderOfStates[i];
      }else{
        order = orderOfStates[i];
      }
    }
    if(order){
      universalityContract.methods["checkComplianceRule"].cacheSend(orderOfStates[orderOfStates.length - 1]);
      precedenceContract.methods["checkComplianceRule"].cacheSend(orderOfStates[orderOfStates.length - 1]);
      existenceContract.methods["checkComplianceRule"].cacheSend(orderOfStates[orderOfStates.length - 1]);
      absenceContract.methods["checkComplianceRule"].cacheSend(orderOfStates[orderOfStates.length - 1]);
    }else{
      universalityMessage = "Compliance violation: Send package after receiving money is missing.";
    }
  }

  //function to make visual changes to the frontend
  changeColor = (state, color="orange") => {
    document.embeds["bpmn-diagram"].getSVGDocument().getElementById(state).style.setProperty("fill", color, "");
  }

  //function that gets called regulary to render the frontend
  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <div className="App">
        <div id="both">
          <h1>🛒 online-shop</h1>
          <div id="leftSpan">
            <div>
              order value: <input type="text" onKeyDown={this.handleKeyDown} /> €<br/>
              <br/>
              <button id="reset" onClick={this.reset}>Reset</button> 
              <br/>
              <br/>
              <p id="universality-violation"></p>
              <p id="universality-message"></p>
              <p id="precedence-message"></p>
              <p id="existence-message"></p>
              <p id="absence-message"></p>
            </div>
          </div>  
          <div id="rightSpan">
            <embed id="bpmn-diagram" src="./g12.svg"/>
            <button id="state1" onClick={this.activateBeginVerfiyProcess} disabled={this.returnState() != 1}/> <br/>
            <button id="state2" onClick={this.activateVerifyOrder} disabled={this.returnState() != 2}/> <br/>
            <button id="state3" onClick={this.activateCreateDataEntry} disabled={this.returnState() != 3}/> <br/>
            <button id="state5" onClick={this.activateCreateInvoice} disabled={this.returnState() != 5}/> <br/>
            <button id="state6" onClick={this.activateSendInvoice} disabled={this.returnState() != 6}/> <br/>
            <button id="state7" onClick={this.activateReceivePayment} disabled={this.returnState() != 7 && this.returnState() != 14}/> <br/>
            <button id="state8" onClick={this.activateAssamblePackage} disabled={this.returnState() != 8}/> <br/>
            <button id="state9" onClick={this.activateSendPackage} disabled={this.returnState() != 9}/> <br/>
            <button id="state10" onClick={this.activateRemoveUserDataOnComplete} disabled={this.returnState() != 10}/> <br/>
            <button id="state11" onClick={this.activateCompleteOrder} disabled={this.returnState() != 11}/> <br/>
            <button id="state14" onClick={this.activateTwoWeeksPassedEvent} disabled={this.returnState() != 7 && this.returnState() != 14}/> <br/>
            <button id="state13" onClick={this.activateSendReminder} disabled={this.returnState() != 13}/> <br/>
            <button id="state19" onClick={this.activateReminderReached} disabled={this.returnState() != 19}/> <br/>
            <button id="state15" onClick={this.activateCancelOrder} disabled={this.returnState() != 15}/> <br/>
            <button id="state16" onClick={this.activateDeleteDataAbortion} disabled={this.returnState() != 16}/> <br/>
            <button id="state17" onClick={this.activateFinishCancelation} disabled={this.returnState() != 16}/>
            <button id="state20" onClick={this.activateRejectOrder} disabled={this.returnState() != 4}/>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
