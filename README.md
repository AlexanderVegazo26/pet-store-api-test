# Pet Store API Testing Project

This repository contains a comprehensive testing suite for the Swagger Pet Store API, including both functional API testing and performance testing implementations. The project demonstrates best practices in API testing using modern tools and frameworks.

## Overview

The project is divided into two main components:

1. Functional API Automation Testing (`api-test-automation`)
2. Performance Testing (`api-test-performance`)

Both test projects target the [Swagger Pet Store](https://github.com/swagger-api/swagger-petstore) API, which provides endpoints for managing pets, store orders, and users.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [CI/CD Integration](#cicd-integration)
- [Test Reports](#test-reports)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (LTS version)
- Java 8 or higher
- Docker
- Git
- Maven

## Installation

1. Clone the repository:

```bash
git clone https://github.com/alexandervegazo26/pet-store-api-test.git
cd pet-store-api-test
```

2. Install dependencies for functional testing:

```bash
cd api-test-automation
npm install
npx playwright install --with-deps
```

3. Install dependencies for performance testing:

```bash
cd ../api-test-performance
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

- Automatically runs on push to main branch
- Executes all functional tests
- Generates and publishes test reports
- Available at: `https://[username].github.io/pet-store-api-test/api-test-automation/`

### Performance Testing Workflow

- Can be triggered manually or on push
- Executes performance simulations
- Generates and publishes performance reports
- Available at: `https://[username].github.io/pet-store-api-test/api-test-performance/`

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

## Acknowledgments

- [Swagger Pet Store](https://github.com/swagger-api/swagger-petstore) team for providing the test API
- [Playwright](https://playwright.dev/) for the functional testing framework
- [Gatling](https://gatling.io/) for the performance testing framework