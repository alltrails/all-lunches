# All Lunches Project

**Deployed live site**: https://all-lunches.web.app

Note: Using personal API key to be able to restrict access to just this domain.

---

### Running locally

```
yarn install
yarn dev
```

**Note:**

- To see DebugJS logs, open your console, type `localStorage.debug = "all-lunches:*"`, press `enter` and refresh your page.
- Node `v14.17.3` / Yarn `1.22.17`
- Developed and QA'd only on the latest Chrome (`v100+`)

### Storybook

```
yarn storybook
```

### Tests / Linter

```
yarn test && yarn lint
```

### 3rd party packages

- Firebase for hosting and storing of favorite restaurants
- TypeScript
- Storybook
- Jest
- Redux Sagas
- MapBox GL
- React Hot Toasts
- Styled Components
- Sentry / Segment for deployed site

### Known issues and warnings

- Google Places deprecation warnings in the console.
- An instance of prop type warning when opening and closing the filter options menu. This is due to the ref I added for the filter button.

### Known limitations

- When moving within the map, the location is hard coded to the AllTrails latitude and longitude headquarters. Ideally, we're updating the bounds of the map and when we search, we search within those bounds.

- When icons are grouped together tightly, there's sometimes a noticeable delay in MapBox GL figuring out which icon the cursor is over so the restaurant you are updating might not update immediately when the icons are spread out more evenly.

- Only QA'd on Chrome. Ideally, I'd be checking against IE11, Safari, iOS Safari, iOS Chrome, Firefox, Edge, etc.

### More time

- Feature: Filter hearted restaurants to the top
- Feature: Allow clearing the search results on the map
- Feature: If map moves, be able to re-search that given area with a button pops up at the bottom (or top)
- Feature: More filter options
