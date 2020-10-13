# Sticky Query Params
A tiny javascript module that saves marketing query params across page loads to better track conversions

## Usage

## Usage

```html
<script src = "https://cdn.jsdelivr.net/npm/@gorillabot-labs/sticky-query-params@latest/dist/index.js"></script>
<script>
  var sqpConfig = {};
  sqpConfig.conversionDomain = "app.awesomeproduct.com";

  try {
    sqp.stickParams(sqpConfig);
  } catch (e) {
    console.log(e);
  }
</script>
```

> Note: Some build tools make explicit use of Node features which have been introduced in version *8.9.0*. Please make sure you're using the correct Node version (>8.9.0) before you proceed to create your own build using the commands listed below.

## Development

Keep this module light-weight. Consumers will be uploading this onto their marketing websites and we don't want to slow them down.

3 Rules to keep in mind: 

1. Keep it simple
1. Keep it fast
1. Keep it tested 

## Testing

1. Run test suite: `yarn test`

## Deployment

1. Run test suite: `yarn test`
1. Create build: `yarn build`
1. Bump package.json version 
1. Commit new version `git add . && git commit`
1. Publish to npm `npm publish --access public`
