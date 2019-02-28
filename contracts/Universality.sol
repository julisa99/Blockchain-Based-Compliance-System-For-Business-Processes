pragma solidity ^0.4.24;
import "./ComplianceRule.sol";

contract Universality is ComplianceRule {
  event UniversalityEvent(int OrderOfStates, bool returnValue, bool violation);
  bool public active  = false;
  bool public violation = false;

  function reset() external{
    active  = false;
    violation = false;
  }

  function checkComplianceRule(int OrderOfStates) external returns (bool){
    if(OrderOfStates == 5){
      active = true;
    }
    if(OrderOfStates == 11){
      active = false;
    }
    if(active && (OrderOfStates == 4 || OrderOfStates == 18 || OrderOfStates == 12)){
      violation = true;
    }
    emit UniversalityEvent(OrderOfStates, active, violation);
    return active;
  }
}
