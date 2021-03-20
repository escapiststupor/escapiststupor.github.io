- `npm run build` to output files to `/docs`
- static assets goes to `/docs` thanks to the CopyPlugin
- in https://github.com/escapiststupor/escapiststupor.github.io/settings
  put www.rejectedpromise.me in custom domain
- caveat: there is no contenthash, so sometimes github page will cache the bundle.js and main.css. (sth I cannot control) We can add contenthash, but since I am using a static html with hard coded path for css and js bundles, I feel it's not really necessary - it's not like we deploy everyday. Locally, open `portfolio/docs/index.html` to inspect, and only publish once finish.


https://www.ivarprudnikov.com/static-website-multiple-html-pages-using-webpack-plus-github-example/