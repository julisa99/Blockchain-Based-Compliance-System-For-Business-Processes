pragma solidity ^0.4.24;
import "./ComplianceRule.sol";

contract Absence is ComplianceRule {
  event AbsenceEvent(int OrderOfStates, bool returnValue, bool violation);
  bool public active  = false;
  bool public violation = false;

  function reset() external{
    active  = false;
    violation = false;
  }

  function checkComplianceRule(int OrderOfStates) external returns (bool){
    if(OrderOfStates == 4){
      active = true;
    }
    if(OrderOfStates == 20){
      active = false;
    }
    emit AbsenceEvent(OrderOfStates, active, violation);
    return active;
  }
}
