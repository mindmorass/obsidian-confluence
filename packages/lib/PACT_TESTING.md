# Pact Contract Testing

This project uses [Pact](https://docs.pact.io/) for contract-based testing of the Confluence API integration.

## What is Pact?

Pact is a contract testing tool that allows you to test the integration between your application and external APIs without making real HTTP requests. It creates a mock server that validates both the requests your code makes and the responses it expects.

## Benefits

1. **No Real API Calls**: Tests run without needing valid Confluence credentials
2. **Fast**: Tests run much faster than integration tests with real APIs
3. **Reliable**: Tests won't fail due to network issues or API changes
4. **Contract Validation**: Ensures your code matches the expected API contract
5. **CI/CD Friendly**: Can run in any environment without external dependencies

## How It Works

1. **Consumer Tests** (this codebase): Define the expected interactions with the Confluence API
2. **Pact Mock Server**: Acts as a fake Confluence API during tests
3. **Contract Files**: Generated JSON files that describe the API contract
4. **Provider Verification**: (Optional) Can verify contracts against real Confluence API

## Running Pact Tests

```bash
# Run all tests (including Pact tests)
npm test

# Run only Pact tests
npm test -- Publisher.pact.test.ts
```

## Test Structure

The Pact test (`Publisher.pact.test.ts`) defines interactions for:

- Getting current user information
- Retrieving parent page by ID
- Searching for pages by title
- Creating new pages
- Updating page content
- Retrieving updated pages

Each interaction specifies:
- **State**: The condition under which the interaction occurs
- **Request**: What request is made (method, path, headers, body)
- **Response**: What response is expected (status, headers, body)

## Generated Files

Pact generates contract files in `packages/lib/pact/pacts/` that describe the API contract. These files can be:
- Committed to version control (recommended)
- Shared with API providers
- Used for provider verification

## Adding New Interactions

When adding new Confluence API calls, add corresponding Pact interactions:

```typescript
await provider.addInteraction({
  state: "description of state",
  uponReceiving: "description of request",
  withRequest: {
    method: "GET",
    path: "/wiki/rest/api/...",
    // ... request details
  },
  willRespondWith: {
    status: 200,
    // ... response details
  },
});
```

## Matchers

Pact provides matchers for flexible matching:
- `like(value)` - Matches the type and structure
- `eachLike(value)` - Matches arrays
- `term({ generate, matcher })` - Matches with regex

See the [Pact documentation](https://docs.pact.io/) for more details.

