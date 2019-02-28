pragma solidity ^0.4.24;

contract OnlineShopBusinessProcess {
  enum States {
        INITIAL_STATE,          //0
        RECEIVED_ORDER,         //1
        VERIFY_ORDER,           //2
        ORDER_VERIFIED,         //3
        ORDER_REJECTED,         //4
        ADDRESS_STORED,         //5
        INVOICE_CREATED,        //6
        INVOICE_SEND,           //7
        PAYMENT_RECEIVED,       //8
        PACKAGE_ASSAMBELED,     //9
        PACKAGE_SEND,           //10
        REMOVED_CONTACT_,       //11
        ORDER_COMPLETED,        //12
        TWO_WEEKS_PAST,         //13
        REMINDER_SEND,          //14
        REMINDER_REACHED,       //15
        SEND_CANCELLATION,      //16
        REMOVED_CONTACT,        //17
        ORDER_CANCELLED,        //18
        TWO_WEEKS_PAST_,        //19
        REJECT_ORDER            //20
  }

  States public state = States.INITIAL_STATE;
  uint public payment = 0;

  modifier isInState(States targetState) {
    require(state == targetState, "wrong state");
    _;
  }


  //collection of function to different state changes

  function receiveOrder (uint ordervalue) external isInState(States.INITIAL_STATE) {
    payment = ordervalue;
    state = States.RECEIVED_ORDER;
  }

  function beginVerifyProcess() external isInState(States.RECEIVED_ORDER){
    state = States.VERIFY_ORDER;
  }

  function verifyOrder() external isInState(States.VERIFY_ORDER){
    if(payment >= 29){
      state = States.ORDER_VERIFIED;
    }else{
      payment = 0;
      state = States.ORDER_REJECTED;
    }
  }

  function rejectOrder() external isInState(States.ORDER_REJECTED){
    state = States.REJECT_ORDER;
  }

  function createDataEntry() external isInState(States.ORDER_VERIFIED){
    state = States.ADDRESS_STORED;
  }

  function finishCancelation() external isInState(States.SEND_CANCELLATION){
    state = States.ORDER_CANCELLED;
  }

  function deleteData() external isInState(States.PACKAGE_SEND){
    state = States.REMOVED_CONTACT_;
  }

  function deleteDataAbortion() external isInState(States.SEND_CANCELLATION){
    state = States.REMOVED_CONTACT;
  }

  function completeOrder() external isInState(States.REMOVED_CONTACT_){
    state = States.ORDER_COMPLETED;
  }

  function createInvoice() external isInState(States.ADDRESS_STORED){
    state = States.INVOICE_CREATED;
  }

  function sendInvoice() external isInState(States.INVOICE_CREATED){
    state = States.INVOICE_SEND;
  }

  function twoWeeksPassedEvent() external {
    if(state == States.INVOICE_SEND){
      state = States.TWO_WEEKS_PAST;
    }else{
      state = States.TWO_WEEKS_PAST_;
    }
  }

  function sendReminder() external isInState(States.TWO_WEEKS_PAST){
    state = States.REMINDER_SEND;
  }

  function reminderReached() external isInState(States.TWO_WEEKS_PAST_){
    state = States.REMINDER_REACHED;
  }


  function cancelOrder() external isInState(States.REMINDER_REACHED){
    state = States.SEND_CANCELLATION;
  }

  function receivePayment() external {
      state = States.PAYMENT_RECEIVED;
  }

  function assamblePackage() external isInState(States.PAYMENT_RECEIVED){
    state = States.PACKAGE_ASSAMBELED;
  }

  function sendPackage() external isInState(States.PACKAGE_ASSAMBELED){
    state = States.PACKAGE_SEND;
  }

  function reset() external{
    payment = 0;
    state = States.INITIAL_STATE;
  }
}