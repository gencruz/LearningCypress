
/*

This a Ticket Purchase system developed to provide user with an option to buy tickets prior a travel start.
Taking into account tha Business want to improve the system and that the number of tests cases and tests suits increase condirable every day
The company decided to automate E2E flows, starting with possibility to buy ticket. As this has high demands and is a part crucial
of the system.
The automation here take the assumption that user has already an acoount created with Comboio Portugal website.
*/


/*Navigate to the URL
The describe line states what the test does
To scale website access the value of the URL should be saved in a variable. So every time we need to navigate to a different
website we call the variable name where we passe the value where we define values for a specific test.
*/

//1. Write an automated solution that will simulate a train ticket purchase
//Import package to be used to set date with correct format
import dayjs from 'dayjs';

//declare variables to help reusability of automated steps.
//var departFrom = #stationPartidaID;
//var arrivalTo = #arrival-date;
//var departureDate = #datepicker-first;
//var arrivalDate = #datepicker-second;
//var passangerType = #option1;
//var passangerTypeLabel = #option2Label;
//var cancel = #exitButton;

describe('Comboio De Portugal-Automation for Train Ticket Booking', () => {
  it('Navigate to the Comboio Portuguese Page', () => {
    cy.request('https://www.cp.pt/passageiros/en/buy-tickets');

  });
});
//Click to select Buy Tickets tab
// 
describe('Click in the link containing "online-ticket', () => {
  it('Navigate to online-ticket Page', () => {
    cy.request('https://www.cp.pt/passageiros/en/buy-tickets');
    //.invoke().click();
    //cy.contains('a', 'Buy Tickets').click();
    //cy.get('a, [href="/passageiros/en/buy-tickets"]').click();
 
//Validate you land in the correct Page
cy.contains('Online Tickets').should('be.visible');   
 
//check if element exist and select departure station
cy.get('#stationPartidaID')
      .should('be.visible')
      .type('Lagos')
      .should('have.value', 'Lagos'); 
// Select arrival station
cy.get('#arrival-date')
      .should('be.visible')
      .type('Porto Campanha')
      .should('have.value','Porto Campanha');

// Set departure date (3 days From today)
const departureDate = dayjs().add(3, 'day').format('YYYY-MM-DD');
cy.get('departureDate').type(departureDate);

// Set return date (5 days from today )
const returnDate = dayjs().add(5, 'day').format('YYYY-MM-DD');
cy.get('returnDate').type(returnDate);
 
//Submit the form
cy.get('submitButton').click();



//Go Back to Home page
cy.get('#exitButton').click(); 

//Task 1 - d Validate parameters once request lands on - 

//This test will fail if I click Cancel before validating the fields.
    // Check table headers
    cy.get('table.table-search-results thead tr th').eq(1).should('contain', 'Departure');
    cy.get('table.table-search-results thead tr th').eq(2).should('contain', 'Arrival');

    // Validate Outward journey (first row)
    cy.get('table.table-search-results tbody tr').eq(0).as('outwardRow');
    cy.get('@outwardRow').find('td').eq(0).should('contain', 'Outward: 2025-06-16');
    cy.get('@outwardRow').find('td').eq(1).should('contain', 'Lagos');
    cy.get('@outwardRow').find('td').eq(2).should('contain', 'Porto Campanha');

    // Validate Inward journey (second row)
    cy.get('table.table-search-results tbody tr').eq(1).as('inwardRow');
    cy.get('@inwardRow').find('td').eq(0).should('contain', 'Inward: 2025-06-18');
    cy.get('@inwardRow').find('td').eq(1).should('contain', 'Porto Campanha');
    cy.get('@inwardRow').find('td').eq(2).should('contain', 'Lagos');



    cy.get('#depart').should('have.value', 'Lagos');
    cy.get('#arrival').should('have.value', 'Porto Campanha');
    cy.get('#departureDate').should('have.value', departureDate);
    cy.get('#returnDate').should('have.value', returnDate);

});

});
/**
 * 
 * As this is my first time seeing and work with Cypress I had to look for help from Stackoverflow community to understand how to use the framework
 * I also had to learn how to install it and had to install many different components in order to have the framework running.
 * 
 * Task 1 - C This is a bug as there is no Cancel button. The way to go back to home page is pressing the New Session button 
Report this issue by providing steps to replicate the issue with screenshot etc in a proper bug report/tracker system
Or request clear acceptance criteria based on 
Give A user wants to cancel the trip
When when clicks on ????
Then ???????
In Order to validate all parameters for train search

Task 2 Are there any oddities you noticed about the website from a functional or UX
perspective?
Yes I could spot many oddities, specially that the system does not request an option to login. 
For security reason user should be encouraged to have an account with the website.
Form Field IDs names are very unaproppriate and difficult to know the functionality based on name given.
Date Picker: The date picker should allow easy selection of dates, and the format should be consistent.
When picking the date format is yyyy-MM-DD but in the out put is DD MM YYYY and in full month name
You provide a specific time to to depart and to return but in the output you get estimated time.
Lint is not used to name fields during request field. There is no Label to guide user for what is departure and what is arrival fields.
No clear instruction and website not USER Frindly, sometimes forcing user to guess what a field is for.
The riquirements are not defined clearly leading to many mistakes and requiring going forward and back for clarification
The sequences of facts are not efficients as it ask to do action that eliminates others.

--Found help in StackOverflow https://stackoverflow.com/questions/67501332/how-to-correctly-install-and-configure-cypress-from-behind-a-proxy - related to intallation
--Found help to deal with data issue - https://stackoverflow.com/questions/71441826/cypress-testing-expect-a-date-format

*/



