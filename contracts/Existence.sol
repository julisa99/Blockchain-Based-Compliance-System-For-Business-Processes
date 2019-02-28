pragma solidity ^0.4.24;
import "./ComplianceRule.sol";

contract Existence is ComplianceRule {
  event ExistenceEvent(int OrderOfStates, bool returnValue, bool violation);
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
    if(OrderOfStates == 9 || OrderOfStates == 14){
      active = false;
    }
    emit ExistenceEvent(OrderOfStates, active, violation);
    return active;
  }
}
