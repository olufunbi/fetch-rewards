Feature: Determine the fake gold bar amongst 9 bars

    There are 9 gold bars, one of them is fake and weighs less than the other eight, this test determines the fake gold bar

  Scenario: Determine the fake gold bar
  When I find the fake bar and verify "Yay, You found it!" alert is displayed
  And I get the weighing list
  Then the weighings list should be saved in a text file
