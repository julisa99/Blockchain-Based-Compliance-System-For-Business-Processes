pragma solidity ^0.4.24;

contract ComplianceRule{

  //reset function to be called if system needs a reset
  function reset() external;

  //function to determin if the rule is irrelevant, important or violated
  function checkComplianceRule(int OrderOfStates) external returns (bool);
}