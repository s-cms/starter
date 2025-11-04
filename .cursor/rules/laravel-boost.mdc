<laravel-boost-guidelines>
=== foundation rules ===

# Laravel Boost Guidelines

The Laravel Boost guidelines are specifically curated by Laravel maintainers for this application. These guidelines should be followed closely to enhance the user's satisfaction building Laravel applications.

## Foundational Context
This application is a Laravel application and its main Laravel ecosystems package & versions are below. You are an expert with them all. Ensure you abide by these specific packages & versions.

- php - 8.4.13
- inertiajs/inertia-laravel (INERTIA) - v2
- laravel/fortify (FORTIFY) - v1
- laravel/framework (LARAVEL) - v12
- laravel/prompts (PROMPTS) - v0
- laravel/wayfinder (WAYFINDER) - v0
- larastan/larastan (LARASTAN) - v3
- laravel/mcp (MCP) - v0
- laravel/pint (PINT) - v1
- pestphp/pest (PEST) - v4
- phpunit/phpunit (PHPUNIT) - v12
- rector/rector (RECTOR) - v2


## Conventions
- You must follow all existing code conventions used in this application. When creating or editing a file, check sibling files for the correct structure, approach, naming.
- Use descriptive names for variables and methods. For example, `isRegisteredForDiscounts`, not `discount()`.
- Check for existing components to reuse before writing a new one.

## Verification Scripts
- Do not create verification scripts or tinker when tests cover that functionality and prove it works. Unit and feature tests are more important.

## Application Structure & Architecture
- Stick to existing directory structure - don't create new base folders without approval.
- Do not change the application's dependencies without approval.

## Replies
- Be concise in your explanations - focus on what's important rather than explaining obvious details.

## Documentation Files
- You must only create documentation files if explicitly requested by the user.


=== boost rules ===

## Laravel Boost
- Laravel Boost is an MCP server that comes with powerful tools designed specifically for this application. Use them.

## Artisan
- Use the `list-artisan-commands` tool when you need to call an Artisan command to double check the available parameters.

## URLs
- Whenever you share a project URL with the user you should use the `get-absolute-url` tool to ensure you're using the correct scheme, domain / IP, and port.

## Tinker / Debugging
- You should use the `tinker` tool when you need to execute PHP to debug code or query Eloquent models directly.
- Use the `database-query` tool when you only need to read from the database.

## Reading Browser Logs With the `browser-logs` Tool
- You can read browser logs, errors, and exceptions using the `browser-logs` tool from Boost.
- Only recent browser logs will be useful - ignore old logs.

## Searching Documentation (Critically Important)
- Boost comes with a powerful `search-docs` tool you should use before any other approaches. This tool automatically passes a list of installed packages and their versions to the remote Boost API, so it returns only version-specific documentation specific for the user's circumstance. You should pass an array of packages to filter on if you know you need docs for particular packages.
- The 'search-docs' tool is perfect for all Laravel related packages, including Laravel, Inertia, Livewire, Filament, Tailwind, Pest, Nova, Nightwatch, etc.
- You must use this tool to search for Laravel-ecosystem documentation before falling back to other approaches.
- Search the documentation before making code changes to ensure we are taking the correct approach.
- Use multiple, broad, simple, topic based queries to start. For example: `['rate limiting', 'routing rate limiting', 'routing']`.
- Do not add package names to queries - package information is already shared. For example, use `test resource table`, not `filament 4 test resource table`.

### Available Search Syntax
- You can and should pass multiple queries at once. The most relevant results will be returned first.

1. Simple Word Searches with auto-stemming - query=authentication - finds 'authenticate' and 'auth'
2. Multiple Words (AND Logic) - query=rate limit - finds knowledge containing both "rate" AND "limit"
3. Quoted Phrases (Exact Position) - query="infinite scroll" - Words must be adjacent and in that order
4. Mixed Queries - query=middleware "rate limit" - "middleware" AND exact phrase "rate limit"
5. Multiple Queries - queries=["authentication", "middleware"] - ANY of these terms


=== php rules ===

## PHP

- Always use curly braces for control structures, even if it has one line.

### Constructors
- Use PHP 8 constructor property promotion in `__construct()`.
    - <code-snippet>public function __construct(public GitHub $github) { }</code-snippet>
- Do not allow empty `__construct()` methods with zero parameters.

### Type Declarations
- Always use explicit return type declarations for methods and functions.
- Use appropriate PHP type hints for method parameters.

<code-snippet name="Explicit Return Types and Method Params" lang="php">
protected function isAccessible(User $user, ?string $path = null): bool
{
    ...
}
</code-snippet>

## Comments
- Prefer PHPDoc blocks over comments. Never use comments within the code itself unless there is something _very_ complex going on.

## PHPDoc Blocks
- Add useful array shape type definitions for arrays when appropriate.

## Enums
- Typically, keys in an Enum should be TitleCase. For example: `FavoritePerson`, `BestLake`, `Monthly`.


=== javascript/typescript rules ===

## JavaScript/TypeScript - Ultracite Formatter & Linter Rules

These rules ensure consistent, accessible, and maintainable JavaScript/TypeScript code. Follow these guidelines for all frontend code.

### Accessibility
- Avoid `accessKey` attr and distracting els
- No `aria-hidden="true"` on focusable els
- No ARIA roles, states, props on unsupported els
- Use `scope` prop only on `<th>` els
- No non-interactive ARIA roles on interactive els
- Label els need text and associated input
- No event handlers on non-interactive els
- No interactive ARIA roles on non-interactive els
- No `tabIndex` on non-interactive els
- No positive integers on `tabIndex` prop
- No `image`, `picture`, or `photo` in img alt props
- No explicit role matching implicit role
- Valid role attrs on static, visible els w/ click handlers
- Use `title` el for `svg` els
- Provide meaningful alt text for all els requiring it
- Anchors need accessible content
- Assign `tabIndex` to non-interactive els w/ `aria-activedescendant`
- Include all required ARIA attrs for els w/ ARIA roles
- Use valid ARIA props for the el's role
- Use `type` attr on `button` els
- Make els w/ interactive roles and handlers focusable
- Heading els need accessible content
- Add `lang` attr to `html` el
- Use `title` attr on `iframe` els
- Pair `onClick` w/ `onKeyUp`, `onKeyDown`, or `onKeyPress`
- Pair `onMouseOver`/`onMouseOut` w/ `onFocus`/`onBlur`
- Add caption tracks to audio and video els
- Use semantic els vs role attrs
- All anchors must be valid and navigable
- Use valid, non-abstract ARIA props, roles, states, and values
- Use valid values for `autocomplete` attr
- Use correct ISO language codes in `lang` attr

### Code Style & Best Practices
- Use `for...of` vs `Array.forEach`
- Use arrow fns vs function exprs
- Use `const` for vars only assigned once
- Use template literals vs string concatenation
- Use object spread vs `Object.assign()` for new objects
- Use `===` and `!==`
- Use `Date.now()` for milliseconds since Unix Epoch
- Use `.flatMap()` vs `map().flat()`
- Use `indexOf`/`lastIndexOf` vs `findIndex`/`findLastIndex` for simple lookups
- Use literal property access vs computed property access
- Use binary, octal, or hex literals vs `parseInt()`
- Use concise optional chains vs chained logical exprs
- Use regex literals vs `RegExp` ctor
- Use `String.slice()` vs `String.substr()` and `String.substring()`
- Use `String.trimStart()`/`String.trimEnd()` vs `String.trimLeft()`/`String.trimRight()`
- Use `at()` vs integer index access
- Use `as const` vs literal type annotations
- Use `**` op vs `Math.pow`
- Use `export type` and `import type` for types
- Use kebab-case, ASCII filenames
- Use `<>...</>` vs `<Fragment>...</Fragment>`
- Use `node:assert/strict` vs `node:assert`
- Use `node:` protocol for Node.js builtin modules
- Use `Number` props vs global ones
- Use numeric separators in numeric literals
- Use assignment op shorthand
- Use fn types vs object types w/ call signatures
- Put default and optional fn params last
- Include `default` clause in switch stmts
- Put default clauses in switch stmts last
- Follow curly brace conventions
- Use `else if` vs nested `if` in `else` clauses and single `if` vs nested `if` clauses
- Use `T[]` vs `Array<T>`
- Use `new` for all builtins except `String`, `Number`, and `Boolean`
- Declare object literals consistently
- Use consistent arrow fn bodies and either `interface` or `type` consistently
- Use `Array.isArray()` vs `instanceof Array`
- Use `while` loops vs `for` loops if initializer and update aren't needed
- Use `await` in async fns
- Use `isNaN()` when checking for NaN
- Use `{ type: "json" }` for JSON module imports
- Use radix arg w/ `parseInt()`
- Use digits arg w/ `Number#toFixed()`
- Use static `Response` methods vs `new Response()`
- Use `use strict` directive in script files
- Use `new` when throwing an error
- Include generic font family in font families
- Use standard direction values for linear gradient fns
- Use valid named grid areas in CSS Grid Layouts
- Use `@import` at-rules in valid positions
- Include `var` fn for CSS vars
- Use `preconnect` attr w/ Google Fonts
- Use recommended display strategy w/ Google Fonts
- Declare regex literals at top level
- Add `rel="noopener"` when using `target="_blank"`
- Add `href` attr to `<a>` els and `width`/`height` attrs to `<img>` els
- Include `if` stmt in for-in loops
- Return consistent values in iterable callbacks
- Use `namespace` keyword vs `module` keyword

### React Specific
- Use fn comps vs class comps
- No legacy `React.forwardRef`. Use ref as prop instead (React 19+)
- No defining comps inside other comps
- No reassigning props in React comps
- No using return value from `ReactDOM.render()`
- No adding children to void els like `<img>` and `<br>`
- Specify all dependencies correctly in React hooks
- Call React hooks from top level of comp fns only
- Add `key` prop to els in iterables
- No array indices as keys
- No duplicate props in JSX
- No semicolons that change JSX el semantics
- No passing children as props. Nest children between opening and closing tags
- No both `children` and `dangerouslySetInnerHTML` props
- No dangerous JSX props
- No `then` prop

### TypeScript
- No `any` type
- No `unknown` as type constraints
- No implicit `any` type on var decls
- No letting vars evolve into `any` type through reassignments
- No initializing vars to `undefined`
- Use `export type` and `import type` for types
- No TS const enums
- No TS namespaces
- No `void` type outside generic or return types
- No `@ts-ignore` directive
- No non-null assertions after optional chaining
- No misusing non-null assertion op (`!`)
- No non-null assertions (`!`)
- Explicitly initialize each enum member value
- Capitalize all enum values
- Use literal values for all enum members

### Prohibited Patterns
- No `var`
- No `console`
- No `debugger`
- No `with` stmts
- No global `eval()`
- No `alert`, `confirm`, and `prompt`
- No bitwise ops
- No assigning directly to `document.cookie`
- No unnecessary catch clauses, ctors, `continue`, escape sequences in regex literals, fragments, labels, or nested blocks
- No empty exports
- No renaming imports, exports, or destructured assignments to same name
- No unnecessary string/template literal concatenation
- No useless cases in switch stmts
- No `this` aliasing
- No `String.raw` without escape sequences
- No unnecessary boolean casts or callbacks on `flatMap`
- No classes w/ only static members
- No `this` and `super` in static contexts
- No empty character classes in regex literals or destructuring patterns
- No `__dirname` and `__filename` in global scope
- No calling global object props as fns or declaring fns and `var` accessible outside their block
- No reassigning `const` vars or constant exprs in conditions
- No `Math.min`/`Math.max` to clamp values where result is constant
- No return values from ctors or setters
- No vars and params before their decl
- No `\8` and `\9` escape sequences in strings
- No literal numbers that lose precision
- No configured els
- No assigning where both sides are same
- No lexical decls in switch clauses or undeclared vars
- No unknown CSS value fns, media feature names, props, pseudo-class/pseudo-element selectors, type selectors, or units
- No unmatchable An+B selectors or unreachable code
- No control flow stmts in `finally` blocks
- No optional chaining where `undefined` is not allowed
- No unused fn params, imports, labels, private class members, or vars
- No return values from fns w/ return type `void`
- No reassigning exceptions in catch clauses
- No reassigning class members
- No inserting comments as text nodes
- No comparing against `-0`
- No labeled stmts that aren't loops
- No exprs where op doesn't affect value
- No control chars in regex literals
- No duplicate `@import` rules, case labels, class members, custom props, conditions in if-else-if chains, GraphQL fields, font family names, object keys, fn param names, decl block props, keyframe selectors, or describe hooks
- No empty CSS blocks, block stmts, static blocks, or interfaces
- No `export` or `module.exports` in test files
- No fallthrough in switch clauses
- No focused or disabled tests
- No reassigning fn decls
- No assigning to native objects and read-only global vars
- No assigning to imported bindings
- No `!important` within keyframe decls
- No irregular whitespace chars
- No labels that share name w/ var
- No chars made w/ multiple code points in char classes
- No shorthand assign when var appears on both sides
- No octal escape sequences in strings
- No `Object.prototype` builtins directly
- No `quickfix.biome` in editor settings
- No redeclaring vars, fns, classes, and types in same scope
- No redundant `use strict`
- No comparing where both sides are same
- No shadowing restricted names
- No shorthand props that override related longhand props
- No sparse arrays
- No template literal placeholder syntax in regular strings
- No separating overload signatures
- No unnecessary escapes in strings or useless backreferences in regex literals
- No spread syntax on accumulators, barrel files, `delete` op, dynamic namespace import access, namespace imports, or duplicate polyfills from Polyfill.io
- No lower specificity selectors after higher specificity selectors
- No `@value` rule in CSS modules
- No assigning in exprs
- No async fns as Promise executors
- No `!` pattern in first position of `files.includes`
- No merging interface and class decls unsafely
- No unsafe negation (`!`)
- No `let` or `var` vars that are read but never assigned
- No unknown at-rules
- No passing children as props
- No negating `if` conditions when there's an `else` clause
- No nested ternary exprs
- No reassigning fn params
- No parameter props in class ctors
- No constants where value is upper-case version of name
- No template literals without interpolation or special chars
- No `else` blocks when `if` block breaks early
- No yoda exprs
- No `Array` ctors
- No unnecessary catch clauses

### Code Organization
- Keep fns under Cognitive Complexity limit
- Limit nesting depth of `describe()` in tests
- Make switch-case stmts exhaustive and limit number of fn params
- Mark members `readonly` if never modified outside ctor
- Place getters and setters for same prop adjacent
- Use consistent accessibility modifiers on class props and methods
- Sort CSS utility classes
- Use correct syntax for ignoring folders in config

### Documentation & Comments
- Start JSDoc comment lines w/ single asterisk
- Specify deletion date w/ `@deprecated` directive
- Specify reason arg w/ `@deprecated` directive

### Error Handling
- Pass message value when creating built-in errors
- Return value from get methods
- No throwing non-`Error` values

### Testing
- Place assertion fns inside `it()` fn calls
- No callbacks in async tests and hooks
- Use `Number.isFinite` and `Number.isNaN` vs global `isFinite` and `isNaN`

### Additional Constraints
- No consecutive spaces in regex literals
- Avoid `arguments`, comma op, and primitive type aliases
- No empty type params in type aliases and interfaces
- Use simpler alternatives to ternary ops if possible
- Avoid `void` op
- Use base 10 or underscore separators for number literal object member names
- Remove redundant terms from logical exprs
- Compare string case modifications w/ compliant values
- Call `super()` exactly once before accessing `this` in ctors
- Instantiate builtins correctly
- Use `super()` correctly in classes
- Move `for` loop counters in right direction
- Compare `typeof` exprs to valid values
- Include `yield` in generator fns
- No importing deprecated exports, duplicate dependencies, or Promises where they're likely a mistake
- No shadowing vars from outer scope
- No expr stmts that aren't fn calls or assignments or useless `undefined`
- No `export` or `module.exports` in test files
- No type annotations for vars initialized w/ literals
- No magic numbers without named constants
- Use `namespace` keyword vs `module` keyword
- Add description param to `Symbol()`
- No extra closing tags for comps without children


=== inertia-laravel/core rules ===

## Inertia Core

- Inertia.js components should be placed in the `resources/js/Pages` directory unless specified differently in the JS bundler (vite.config.js).
- Use `Inertia::render()` for server-side routing instead of traditional Blade views.
- Use `search-docs` for accurate guidance on all things Inertia.

<code-snippet lang="php" name="Inertia::render Example">
// routes/web.php example
Route::get('/users', function () {
    return Inertia::render('Users/Index', [
        'users' => User::all()
    ]);
});
</code-snippet>


=== inertia-laravel/v2 rules ===

## Inertia v2

- Make use of all Inertia features from v1 & v2. Check the documentation before making any changes to ensure we are taking the correct approach.

### Inertia v2 New Features
- Polling
- Prefetching
- Deferred props
- Infinite scrolling using merging props and `WhenVisible`
- Lazy loading data on scroll

### Deferred Props & Empty States
- When using deferred props on the frontend, you should add a nice empty state with pulsing / animated skeleton.

### Inertia Form General Guidance
- Build forms using the `useForm` helper. Use the code examples and `search-docs` tool with a query of `useForm helper` for guidance.


=== laravel/core rules ===

## Do Things the Laravel Way

- Use `php artisan make:` commands to create new files (i.e. migrations, controllers, models, etc.). You can list available Artisan commands using the `list-artisan-commands` tool.
- If you're creating a generic PHP class, use `artisan make:class`.
- Pass `--no-interaction` to all Artisan commands to ensure they work without user input. You should also pass the correct `--options` to ensure correct behavior.

### Database
- Always use proper Eloquent relationship methods with return type hints. Prefer relationship methods over raw queries or manual joins.
- Use Eloquent models and relationships before suggesting raw database queries
- Avoid `DB::`; prefer `Model::query()`. Generate code that leverages Laravel's ORM capabilities rather than bypassing them.
- Generate code that prevents N+1 query problems by using eager loading.
- Use Laravel's query builder for very complex database operations.

### Model Creation
- When creating new models, create useful factories and seeders for them too. Ask the user if they need any other things, using `list-artisan-commands` to check the available options to `php artisan make:model`.

### APIs & Eloquent Resources
- For APIs, default to using Eloquent API Resources and API versioning unless existing API routes do not, then you should follow existing application convention.

### Controllers & Validation
- Always create Form Request classes for validation rather than inline validation in controllers. Include both validation rules and custom error messages.
- Check sibling Form Requests to see if the application uses array or string based validation rules.

### Queues
- Use queued jobs for time-consuming operations with the `ShouldQueue` interface.

### Authentication & Authorization
- Use Laravel's built-in authentication and authorization features (gates, policies, Sanctum, etc.).

### URL Generation
- When generating links to other pages, prefer named routes and the `route()` function.

### Configuration
- Use environment variables only in configuration files - never use the `env()` function directly outside of config files. Always use `config('app.name')`, not `env('APP_NAME')`.

### Testing
- When creating models for tests, use the factories for the models. Check if the factory has custom states that can be used before manually setting up the model.
- Faker: Use methods such as `$this->faker->word()` or `fake()->randomDigit()`. Follow existing conventions whether to use `$this->faker` or `fake()`.
- When creating tests, make use of `php artisan make:test [options] <name>` to create a feature test, and pass `--unit` to create a unit test. Most tests should be feature tests.


=== laravel/v12 rules ===

## Laravel 12

- Use the `search-docs` tool to get version specific documentation.
- Since Laravel 11, Laravel has a new streamlined file structure which this project uses.

### Laravel 12 Structure
- No middleware files in `app/Http/Middleware/`.
- `bootstrap/app.php` is the file to register middleware, exceptions, and routing files.
- `bootstrap/providers.php` contains application specific service providers.
- **No app\Console\Kernel.php** - use `bootstrap/app.php` or `routes/console.php` for console configuration.
- **Commands auto-register** - files in `app/Console/Commands/` are automatically available and do not require manual registration.

### Database
- When modifying a column, the migration must include all of the attributes that were previously defined on the column. Otherwise, they will be dropped and lost.
- Laravel 11 allows limiting eagerly loaded records natively, without external packages: `$query->latest()->limit(10);`.

### Models
- Casts can and likely should be set in a `casts()` method on a model rather than the `$casts` property. Follow existing conventions from other models.


=== pest/core rules ===

## Pest

### Testing
- If you need to verify a feature is working, write or update a Unit / Feature test.

### Pest Tests
- All tests must be written using Pest. Use `php artisan make:test --pest <name>`.
- You must not remove any tests or test files from the tests directory without approval. These are not temporary or helper files - these are core to the application.
- Tests should test all of the happy paths, failure paths, and weird paths.
- Tests live in the `tests/Feature` and `tests/Unit` directories.
- Pest tests look and behave like this:
<code-snippet name="Basic Pest Test Example" lang="php">
it('is true', function () {
    expect(true)->toBeTrue();
});
</code-snippet>

### Running Tests
- Write tests when a feature needs testing (e.g., new functionality, complex business logic, critical paths).
- For simple changes or refactoring that don't affect behavior, tests may not be necessary.
- When running tests, use targeted filters: `php artisan test --filter=testName` or `php artisan test tests/Feature/SpecificTest.php`.
- Only run the full test suite (`php artisan test`) for complex features or when explicitly requested.
- Test commands:
  - Run all tests: `php artisan test`
  - Run a specific file: `php artisan test tests/Feature/ExampleTest.php`
  - Filter by test name: `php artisan test --filter=testName`

### Pest Assertions
- When asserting status codes on a response, use the specific method like `assertForbidden` and `assertNotFound` instead of using `assertStatus(403)` or similar, e.g.:
<code-snippet name="Pest Example Asserting postJson Response" lang="php">
it('returns all', function () {
    $response = $this->postJson('/api/docs', []);

    $response->assertSuccessful();
});
</code-snippet>

### Mocking
- Mocking can be very helpful when appropriate.
- When mocking, you can use the `Pest\Laravel\mock` Pest function, but always import it via `use function Pest\Laravel\mock;` before using it. Alternatively, you can use `$this->mock()` if existing tests do.
- You can also create partial mocks using the same import or self method.


=== tests rules ===

## Test Enforcement

- Write tests for features that need testing - new functionality, complex business logic, or critical paths.
- For simple changes or refactoring without behavior changes, tests may be optional.
- When tests are written, run only the relevant tests using filters or specific test files rather than the full suite.


=== .ai/app.actions rules ===

# App/Actions guidelines

- This application uses the Action pattern and prefers for much logic to live in reusable and composable Action classes.
- Actions live in `app/Actions`, they are named based on what they do, with no suffix.
- Actions will be called from many different places: jobs, commands, HTTP requests, API requests, MCP requests, and more.
- Create dedicated Action classes for business logic with a single `handle()` method.
- Inject dependencies via constructor using private properties.
- Create new actions with `php artisan make:action "{name}" --no-interaction`
- Wrap complex operations in `DB::transaction()` within actions when multiple models are involved.
- Some actions won't require dependencies via `__construct` and they can use just the `handle()` method.

<code-snippet name="Example action class" lang="php">

<?php

declare(strict_types=1);

namespace App\Actions;

final readonly class CreateFavorite
{
    public function __construct(private FavoriteService $favorites)
    {
        //
    }

    public function handle(User $user, string $favorite): bool
    {
        return $this->favorites->add($user, $favorite);
    }
}

</code-snippet>


=== .ai/general rules ===

# General Guidelines

- Don't include any superfluous PHP Annotations, except ones that start with `@` for typing variables.
</laravel-boost-guidelines>

### For Detailed Guidance
Consult the comprehensive guides in `docs/`:
- **Section creation patterns** → `universal-section-creation-guide.md`
- **Colors, components, styling** → `project-design-system.md`
- **Full-stack code standards** → `code-style.md`

</laravel-boost-guidelines>
