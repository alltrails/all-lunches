# All Lunches

Deployed live site (This API Key is personal and restricted to this domain): https://all-lunches.web.app

## Instructions

Local

```
yarn install
yarn dev
```

Storybook

```
yarn storybook
```

Tests

```
yarn test
```

Things to note

- To see Debug-JS in your console logs, type `localStorage.debug = "all-lunches:*"`, press enter and refresh your page.
- Node `v14.17.3` / Yarn `1.22.17`

### 3rd party packages

- Firebase for hosting and storing of favorite restaurants
- Storybook
- Jest
- Redux Sagas
- MapBox GL
- React Hot Toasts
- Styled Components
- Sentry / Segment for hosted site

### Known issues and warnings

- Google places deprecation warnings in the console. If given more time, I'd fix.
- An prop type warning when opening and closing the filter options menu. This is due to the ref I added for the filter button that allows the menu to close when the menu is open.

### Known limitations

- When moving within the map, the location is hard coded to the all trails latitude and longitude headquarters. Ideally, we're updating the bounds of the map and when we search, we only search the bounds of the current map.

### More time

- Feature: Filter hearted restaurants to the top
- Feature: Allow clearing the search results on the map
- Feature: If map moves, be able to re-search that given area with a button pops up at the bottom (or top)
- Feature: More filter options
