# NTMR Recipes

## Setup Instructions

1. Clone the repo
2. Install dependencies
3. Run the app

### Clone the repo

```bash
git clone https://github.com/lucasdoell/ntmr-recipes.git
```

### Install dependencies

```bash
pnpm install
```

### Run the app

```bash
pnpm dev
```

## Time Spent

I spent about 6 hours on this project. Most of the time spent was getting Drizzle to cooperate with Better Auth. Once I switched to Prisma instead, I was able to get the app up and running pretty quickly.

## Future Improvements

- Markdown rendering for recipe descriptions
- Deleting recipes
- Image uploads
- Better search implementation
- The edit endpoint is protected by authentication, but may not be the most secure implementation. For a proof of concept, I didn't spend much time on testing the security. One such improvement would be to test the security more thoroughly.
- The edit recipe form has a bug where it doesn't properly show the error toast when the form is submitted by a user who is not the owner of the recipe. This should be fixed.

## Assumptions Made

- Instead of using a traditional REST API, I implemented recipe creation and retrieval using SvelteKit's `load` functions. This is idiomatic SvelteKit and allows me to use the `load` function to fetch data from the database.
- A basic REST API could be implemented using `+server.ts` files. This would be trivial to implement, but I didn't want to spend time on it.
- Search was asked to be implemented for title only, but I included description as well as this would be a common requirement.
