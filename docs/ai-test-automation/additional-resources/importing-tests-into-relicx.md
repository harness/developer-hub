Our customers, usually have tests written in Cypress, Selenium and other testing frameworks that they want to import into Relicx for various reasons. Importing these manually authored tests into Relicx from other frameworks is fairly simple and straighforward. In the section below we will show you how these tests can be seemlessly migrated.&#x20;

We have a test written for the Cypress testing framework that tests the Deposit flow in our sample Digital Bank application.&#x20;

```javascript
describe('DBank app test', function() {
    it('Successfully logs in and makes a deposit', function() {
        cy.visit('http://prod.dbank.staging-apps.relicx.ai:8080/bank/login')

        // Assert that the login page has loaded by checking visibility of the username input field
        cy.get('#username').should('be.visible')

        // Enter username and password

        cy.get('#username')
            .type('jsmith@demo.io')
            .should('have.value', 'jsmith@demo.io') // Assert that the username has been correctly entered

        cy.get('#password')
            .type('Demo123!')
            .should('have.value', 'Demo123!') // Assert that the password has been correctly entered

        cy.get('#submit')
            .click()

        // Assert that the login was successful by checking the URL of the page
        cy.url().should('eq','http://prod.dbank.staging-apps.relicx.ai:8080/bank/home')

        // Navigate to deposit page
        cy.get('#deposit-menu-item')
            .click()

        // Select the account
        cy.get('#selectedAccount')
            .select('95') // Option value for 'Family Checking'
            .should('have.value', '95') // Assert that the correct account has been selected

        // Input the deposit amount
        cy.get('#amount')
            .type('312')
            .should('have.value', '312') // Assert that the correct deposit amount has been entered

        // Submit the deposit
        cy.get('.btn.btn-primary.btn-sm')
            .click()

        // Assert that the deposit was successful
        cy.url().should('have.string','http://prod.dbank.staging-apps.relicx.ai:8080/bank/account/checking-view')

    })
})
```

To import this test into Relicx, we need to add couple of lines of code that will automatically import this test into Relicx when it is executed in Cypress.

```javascript
describe('DBank app test', function() {
    it('Successfully logs in and makes a deposit', function() {
        cy.visit('http://prod.dbank.staging-apps.relicx.ai:8080/bank/login')

        // Assert that the login page has loaded by checking visibility of the username input field
        cy.get('#username').should('be.visible')

        //-------------------------------------------------------------------
        // Call relicx api to name this test
        //-------------------------------------------------------------------
        cy.window().then((win) => {
            win.relicxSDK.sessionVars({
                testName: "deposit_test_from_cypress",
            });
        })

        cy.get('#username')
            .type('jsmith@demo.io')
            .should('have.value', 'jsmith@demo.io') // Assert that the username has been correctly entered

        cy.get('#password')
            .type('Demo123!')
            .should('have.value', 'Demo123!') // Assert that the password has been correctly entered

        cy.get('#submit')
            .click()

        // Assert that the login was successful by checking the URL of the page
        cy.url().should('eq','http://prod.dbank.staging-apps.relicx.ai:8080/bank/home')

        // Navigate to deposit page
        cy.get('#deposit-menu-item')
            .click()

        // Select the account
        cy.get('#selectedAccount')
            .select('95') // Option value for 'Family Checking'
            .should('have.value', '95') // Assert that the correct account has been selected

        // Input the deposit amount
        cy.get('#amount')
            .type('312')
            .should('have.value', '312') // Assert that the correct deposit amount has been entered

        // Submit the deposit
        cy.get('.btn.btn-primary.btn-sm')
            .click()

        // Assert that the deposit was successful
        cy.url().should('have.string','http://prod.dbank.staging-apps.relicx.ai:8080/bank/account/checking-view')
        //-------------------------------------------------------------------
        // optional tell relicx to stop recording (relicx times out on its own after inactivity)
        //-------------------------------------------------------------------
        cy.window().then((win) => {
            win.relicx?.getCollector().stop();
        })
    })
})
```

The two blocks of code that we added are as follows

The first block adds a test name i.e. the name of the test in Relicx.&#x20;

```javascript
 // Call relicx api to name this test
        cy.window().then((win) => {
            win.relicxSDK.sessionVars({
                testName: "deposit_test_imported_from_cypress",
            });
        })
```

The second block, an optional steps, stops the recording once the test execution is done

```javascript
cy.window().then((win) => {
            win.relicx?.getCollector().stop();
        })
```

Once the test is executed n Cypress, a corresponding test is automatically created in Relicx.&#x20;

![](https://archbee-image-uploads.s3.amazonaws.com/TK24Pi0IzdXKBLm-pUBmm/k0_xwvd-ZTyMQL4FX1giX_deposit-test.png)

### Video demo&#x20;
<iframe src="https://www.loom.com/embed/c7a74a29e6654742bd293cdb7b826607" width="960" height="540" frameborder="0" allowfullscreen></iframe>

