# Pet Store API Testing Project

This repository contains a comprehensive testing suite for the Swagger Pet Store API, including both functional API testing and performance testing implementations. The project demonstrates best practices in API testing using modern tools and frameworks.

## Overview

The project is divided into two main components:

1. Functional API Automation Testing (`api-test-automation`)
2. Performance Testing (`api-test-performance`)

Both test projects target the [Swagger Pet Store](https://github.com/swagger-api/swagger-petstore) API, which provides endpoints for managing pets, store orders, and users.

## Table of Contents

- [Test Coverage Overview](#test-coverage-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [CI/CD Integration](#cicd-integration)
- [Test Reports](#test-reports)
- [Functional Test Cases ](#functional-test-cases)
- [Functional Test Case Selection Reason](#functional-test-case-selection-reason)
- [Performance test Scenarios](#performance-test-scenarios)

## Test Coverage Overview

### What's Covered

1. **Functional Testing**

   - Complete CRUD operations for Pets, Store, and Users
   - Authentication and authorization flows
   - Basic data validation
   - Success scenarios for all main endpoints
   - Common error scenarios
   - File upload operations

2. **Performance Testing**

   - Load testing for all major endpoints
   - Concurrent user simulations
   - Resource-intensive operations
   - Business-critical paths

3. **Contract Testing**
   - Response schema validation
   - Required field validation
   - Data type verification
   - Status code validation

### What's Not Covered

1. **Integration Testing**

   - Database persistence validation
   - External service integrations
   - Third-party payment processing
   - Email notification systems

2. **Security Testing**

   - Penetration testing
   - Security scanning
   - Extended authentication scenarios
   - Advanced authorization rules

3. **Edge Cases**
   - Extreme load conditions (>1000 concurrent users)
   - Network failure scenarios
   - Partial system outages
   - Data recovery scenarios

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (LTS version)
- Java 8 or higher
- Docker
- Git
- Maven

## Stack used in this project (main tools)

- Playwright `v1.49.0` (for API automation testing)
- Gatling `3.13.103` (for performance Testing)
- Typescript as the programming language for both projects
- Zod for schema validation

## Installation

1. Clone the repository:

```bash
git clone https://github.com/alexandervegazo26/pet-store-api-test.git
cd pet-store-api-test
```

2. Install dependencies for functional testing:

```bash
cd /api-test-automation
npm install
npx playwright install --with-deps
```

3. Install dependencies for performance testing:

```bash
cd /api-test-performance
npm install
```

4. Start the Pet Store application:

```bash
git clone https://github.com/swagger-api/swagger-petstore.git
cd swagger-petstore

docker build -t swaggerapi/petstore3:unstable .
docker pull swaggerapi/petstore3:unstable
docker run  --name swaggerapi-petstore3 -d -p 8080:8080 swaggerapi/petstore3:unstable
```

## Configuration

### Functional Testing Configuration

The functional tests use Playwright's configuration file (`playwright.config.ts`) which can be found in the `api-test-automation` directory. Key configurations include:

- Test timeouts
- Retry attempts
- Reporter settings
- Base URL configuration

### Performance Testing Configuration

Performance tests are configured through environment variables in the `.env` file:

```ini
# Pet simulation variables
PET_RAMP_DURATION=5
CREATE_PETS=10
READ_PETS=20

# Store simulation variables
ORDER_RAMP_DURATION=5
CREATE_ORDERS=10
READ_ORDERS=20
DELETE_ORDERS=5
READ_INVENTORY=15

# User simulation variables
USER_RAMP_DURATION=5
CREATE_USERS=10
READ_USERS=20
UPDATE_USERS=8
DELETE_USERS=5
AUTH_USERS=25
```

create an .env file under `./api-test-performance`

## Running Tests

### Running Functional Tests

From the `api-test-automation` directory:

```bash
# Run all tests
npm run test
```

```bash
# Run most critical tests, those we usually execute on an smoke test
npm run test:smoke
```

### Running Performance Tests

From the `api-test-performance` directory:

```bash
# Run all simulations
npm run all-simulations

# Run specific simulations
npm run pet-simulation
npm run store-simulation
npm run user-simulation
```

## CI/CD Integration

The project includes GitHub Actions workflows for automated testing:

### Functional Testing Workflow

- Automatically runs on push to main branch (if related changes where affected)
- Can be triggered manually from actions tab in github
- Executes all functional tests
- Generates and publishes test reports
- Available at: `https://alexandervegazo26.github.io/pet-store-api-test/api-test-automation/report/`

### Performance Testing Workflow

- Automatically runs on push to main branch (if related changes where affected)
- Automatically runs on push to main branch
- Can be triggered manually from actions tab in github
- Executes performance simulations
- Generates and publishes performance reports
- Available at: `https://alexandervegazo26.github.io/pet-store-api-test/api-test-performance/`

### Manual Execution from Github actions

In `Actions` tab in github, you can manually run the workflows:

1.  `Functional Tests`
2.  `Performance Tests`

Once you click the workflow you want to execute manually, you can go to `Run Workflow` and click on the green button with the same name (`Run Workflow`).

## Test Reports

### Functional Test Reports

- HTML reports are generated using Playwright's built-in reporter
- Reports include test results and steps
- Published automatically through GitHub Pages

### Performance Test Reports

- Detailed reports generated by Gatling
- Includes response times, throughput, and error rates
- Visual graphs and statistics
- Published automatically through GitHub Pages

## Functional Test Cases

## Pet Endpoints

### Add New Pet

**Prerequisites:**

- Pet Store API is running and accessible
- Valid pet data in JSON format
- Authentication token if required

**Steps:**

1. Send POST request to `/pet` endpoint
2. Include valid pet data in request body
3. Verify response status code
4. Validate response payload

**Expected Results:**

- Response status code: 200
- Response contains created pet details
- Pet data matches input data

### Update Existing Pet

**Prerequisites:**

- Existing pet in the system
- Valid updated pet data
- Pet ID to be updated

**Steps:**

1. Send PUT request to `/pet` endpoint
2. Include updated pet data in request body
3. Verify response status code
4. Validate updated pet information

**Expected Results:**

- Response status code: 200
- Pet details are updated in the system
- Response contains updated pet data

### Find Pets by Status

**Prerequisites:**

- Existing pets with various statuses
- Valid status values (available, pending, sold)

**Steps:**

1. Send GET request to `/pet/findByStatus`
2. Include status parameter in query
3. Verify response status code
4. Validate returned pet list

**Expected Results:**

- Response status code: 200
- Returns array of pets matching status
- Each pet in response has correct status

### Delete Pet

**Prerequisites:**

- Existing pet in the system
- Valid pet ID
- API key for authorization

**Steps:**

1. Send DELETE request to `/pet/{petId}`
2. Include API key in header
3. Verify response status code
4. Attempt to fetch deleted pet

**Expected Results:**

- Response status code: 200
- Pet is removed from system
- Subsequent GET request returns 404

### Invalid Pet Creation

**Prerequisites:**

- Invalid pet data prepared
- API endpoint is accessible

**Steps:**

1. Send POST request to `/pet` endpoint
2. Include invalid pet data
3. Verify response status code
4. Validate error message

**Expected Results:**

- Response status code: 400
- Error message indicates invalid input
- Pet is not created in system

### Upload Pet Image

**Prerequisites:**

- Existing pet in system
- Valid image file
- Correct content-type header

**Steps:**

1. Send POST request to `/pet/{petId}/uploadImage`
2. Attach image file in form-data
3. Verify response status code
4. Validate image upload confirmation

**Expected Results:**

- Response status code: 200
- Image is associated with pet
- Response contains upload success message

### Get Non-existent Pet

**Prerequisites:**

- Invalid/non-existent pet ID

**Steps:**

1. Send GET request to `/pet/{petId}`
2. Use non-existent pet ID
3. Verify response status code
4. Validate error message

**Expected Results:**

- Response status code: 404
- Error message indicates pet not found
- Response body contains appropriate error details

## Store Endpoints

### Place New Order

**Prerequisites:**

- Valid order data
- Existing pet ID for order

**Steps:**

1. Send POST request to `/store/order`
2. Include valid order data
3. Verify response status code
4. Validate order creation response

**Expected Results:**

- Response status code: 200
- Order is created in system
- Response contains order details

### Check Store Inventory

**Prerequisites:**

- Existing inventory data
- API endpoint is accessible

**Steps:**

1. Send GET request to `/store/inventory`
2. Verify response status code
3. Validate inventory data structure

**Expected Results:**

- Response status code: 200
- Returns inventory counts by status
- Response contains valid inventory data

### Delete an Order

**Prerequisites:**

- Existing order in system
- Valid order ID

**Steps:**

1. Send DELETE request to `/store/order/{orderId}`
2. Verify response status code
3. Attempt to fetch deleted order

**Expected Results:**

- Response status code: 200
- Order is removed from system
- Subsequent GET request returns 404

### Find Order by ID

**Prerequisites:**

- Existing order in system
- Valid order ID

**Steps:**

1. Send GET request to `/store/order/{orderId}`
2. Verify response status code
3. Validate order details

**Expected Results:**

- Response status code: 200
- Returns correct order information
- All order fields are present and valid

### Find Non-existing Order by ID

**Prerequisites:**

- Invalid/non-existent order ID

**Steps:**

1. Send GET request to `/store/order/{orderId}`
2. Use non-existent order ID
3. Verify response status code
4. Validate error message

**Expected Results:**

- Response status code: 404
- Error message indicates order not found
- Response contains appropriate error details

## User Endpoints

### Create New User

**Prerequisites:**

- Valid user data
- API endpoint is accessible

**Steps:**

1. Send POST request to `/user`
2. Include valid user data
3. Verify response status code
4. Validate user creation response

**Expected Results:**

- Response status code: 200
- User is created in system
- Response contains user creation confirmation

### User Login

**Prerequisites:**

- Valid user credentials
- Existing user in system

**Steps:**

1. Send GET request to `/user/login`
2. Include username and password parameters
3. Verify response status code
4. Validate session token

**Expected Results:**

- Response status code: 200
- Returns valid session token
- Response includes login timestamp

### Create Multiple Users

**Prerequisites:**

- Array of valid user data
- API endpoint is accessible

**Steps:**

1. Send POST request to `/user/createWithList`
2. Include array of user data
3. Verify response status code
4. Validate creation response

**Expected Results:**

- Response status code: 200
- All users are created in system
- Response indicates successful creation

### User Logout

**Prerequisites:**

- Active user session
- Valid session token

**Steps:**

1. Send GET request to `/user/logout`
2. Include session token if required
3. Verify response status code
4. Validate logout confirmation

**Expected Results:**

- Response status code: 200
- Session is terminated
- User is successfully logged out

### Get User by Username

**Prerequisites:**

- Existing user in system
- Valid username

**Steps:**

1. Send GET request to `/user/{username}`
2. Verify response status code
3. Validate user details

**Expected Results:**

- Response status code: 200
- Returns correct user information
- All user fields are present and valid

### Update User by Username

**Prerequisites:**

- Existing user in system
- Valid username
- Updated user data

**Steps:**

1. Send PUT request to `/user/{username}`
2. Include updated user data
3. Verify response status code
4. Validate user updates

**Expected Results:**

- Response status code: 200
- User details are updated
- Response confirms successful update

### Delete User by Username

**Prerequisites:**

- Existing user in system
- Valid username

**Steps:**

1. Send DELETE request to `/user/{username}`
2. Verify response status code
3. Attempt to fetch deleted user

**Expected Results:**

- Response status code: 200
- User is removed from system
- Subsequent GET request returns 404

## Functional Test Case Selection Reason

The test cases selected for this project represent the most critical paths and functionalities of the Pet Store API. Here's why these specific test cases are crucial:

### Core CRUD Operations Coverage

- Each entity (Pet, Store, User) has complete coverage of Create, Read, Update, and Delete operations
- These operations form the backbone of the API's functionality and must work flawlessly
- Testing these ensures the basic data management capabilities are intact

### Business Logic Validation

- Pet Status Management: Testing pet status changes and filtering ensures the inventory system works correctly
- Order Processing: Verifies the complete order lifecycle from creation to fulfillment
- User Authentication: Covers the essential user management and security features

### Error Handling

- Invalid data scenarios are included for each entity
- Non-existent resource requests are tested
- These cases ensure the API fails gracefully and provides appropriate error messages

### Data Integrity

- Image upload functionality ensures multimedia handling works correctly
- Inventory checking verifies stock management accuracy
- Multiple user creation tests batch processing capabilities

### Security Considerations

- User authentication workflow is thoroughly tested
- Session management (login/logout) is verified
- Authorization requirements for protected endpoints are validated

These test cases were selected based on:

1. Impact on core business functionality
2. Frequency of endpoint usage
3. Complexity of operations
4. Potential for system failures
5. Security implications

By covering these aspects, we ensure the API's reliability, functionality, and security while maintaining efficient test coverage without unnecessary redundancy.

### Performance Test Scenarios

The project includes focused performance test scenarios for critical API operations:

#### Pet Endpoints Performance Tests

```typescript
createPetScenario(); // 100 concurrent users
updatePetScenario(); // 100 concurrent users
findPetsByStatusScenario(); // 100 concurrent users
```

#### Store Endpoints Performance Tests

```typescript
placeOrderScenario(); // 100 concurrent users
getOrderByIdScenario(); // 100 concurrent users
deleteOrderScenario(); // 100concurrent users
getInventoryScenario(); // 100 concurrent users
```

#### User Endpoints Performance Tests

```typescript
createUserScenario(); // 100 concurrent users
createUsersWithListScenario(); // 100 concurrent users
getUserByUsernameScenario(); // 100 concurrent users
updateUserScenario(); // 100 concurrent users
deleteUserScenario(); // 100 concurrent users
loginScenario(); // 100 concurrent users
logoutScenario(); // 100 concurrent users
```

#### Load Testing Configuration

##### The tests use an open model injection profile with the following parameters:

- `injectOpen`: Introduces virtual users into the system using an open workload model, where new users can start regardless of whether previous users have completed their scenarios.
- `rampUsers`: Gradually increases the number of virtual users over time, creating a smooth ramp-up in load.
- `during`: Specifies the duration of the ramp-up period.

This configuration allows for testing how the system handles a gradually increasing load of users creating pets in the system.

### Performance Test Scenario Selection Rationale

These scenarios were chosen based on several key factors:

1. **High-Traffic Operations**

   - Pet search operations typically have the highest usage in pet store systems
   - Inventory checks are frequent operations in store management
   - User authentication is a constant background operation

2. **Resource-Intensive Operations**

   - Batch user creation tests system's ability to handle multiple simultaneous writes
   - Pet image uploads test binary data handling under load
   - Order placement tests complex transactions with multiple database operations

3. **Business-Critical Paths**

   - Authentication scenarios (login/logout) must remain responsive under load
   - Inventory management directly impacts business operations
   - Order processing represents revenue-generating transactions

4. **Data Consistency Operations**
   - Concurrent create/update/delete operations test data integrity
   - Multiple simultaneous reads test caching and database performance
   - Batch operations test system's bulk processing capabilities

Each scenario uses a 100-second ramp-up period with 100 concurrent users to provide:

- Realistic simulation of production load
- Sufficient stress to identify performance bottlenecks
- Consistent baseline for performance metrics
- Manageable test execution time
