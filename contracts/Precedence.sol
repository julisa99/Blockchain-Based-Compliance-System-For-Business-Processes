pragma solidity ^0.4.24;
import "./ComplianceRule.sol";

contract Precedence is ComplianceRule {
  event PrecedenceEvent(int OrderOfStates, bool returnValue, bool violation);
  bool public active  = false;
  bool public violation = false;

  function reset() external{
    active  = false;
    violation = false;
  }

  function checkComplianceRule(int OrderOfStates) external returns (bool){
    if(OrderOfStates == 7){
      active = true;
    }
    if(OrderOfStates == 8 || OrderOfStates == 19){
      active = false;
    }
    if(active && (OrderOfStates == 10)){
      violation = true;
    }
    emit PrecedenceEvent(OrderOfStates, active, violation);
    return active;
  }
}