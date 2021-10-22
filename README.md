# loan_admin

## Project setup

```
npm install
```

```
npm i compression-webpack-plugin@5.0.1
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/)

- 页面小标题由路由中的 'pageTitle'控制 ，存储在 vuex 中，同一个页面可以用 mutations ==》 modifyPageT 修改

```
{
                path: '/element',
                name: 'element',
                component: () => import('@/views/element/element'),
                meta: {
                    pageTitle: '测试页面'
                }
            },

modifyPageT(state, val) {
      state.pageTitle = val;
    }

```
