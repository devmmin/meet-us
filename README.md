<img src="https://user-images.githubusercontent.com/63034944/185580746-dac6bda4-03d5-4f41-bf71-74839041ea97.png" width="150px" height="100%" align="center">

## meet-us

## 📖 Docs

[Project Wiki(개발 컨벤션,API 문서,회의록)](https://github.com/side-meet-us/meet-us/wiki)

[기획서 및 디자인(Figma)](https://www.figma.com/file/BJSBATklwFm7Nkx4dkWohq/%EB%AA%A8%EC%9E%84-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=807%3A9791)

## 📦 backend Directory 구조

```
📦backend
 ┣ 📂.vscode
 ┃ ┗ 📜settings.json
 ┣ 📂graphql
 ┃ ┗ 📜schema.gql
 ┣ 📂mariadb
 ┃ ┗ 📂conf.d
 ┃ ┃ ┗ 📜my.conf
 ┣ 📂prisma
 ┃ ┗ 📜schema.prisma
 ┣ 📂src
 ┃ ┣ 📂@types
 ┃ ┃ ┗ 📂auth
 ┃ ┃ ┃ ┗ 📜index.d.ts
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂commands
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┣ 📜login.handler.ts
 ┃ ┃ ┃ ┗ 📜token-access-refresh.handler.ts
 ┃ ┃ ┣ 📂constants
 ┃ ┃ ┃ ┗ 📜error-code.constant.ts
 ┃ ┃ ┣ 📂events
 ┃ ┃ ┃ ┗ 📜login.event.ts
 ┃ ┃ ┣ 📂guards
 ┃ ┃ ┃ ┣ 📜gql-jwt-auth.guard.ts
 ┃ ┃ ┃ ┣ 📜jwt-auth.guard.ts
 ┃ ┃ ┃ ┗ 📜role.guard.ts
 ┃ ┃ ┣ 📂models
 ┃ ┃ ┃ ┣ 📜auth.model.ts
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┗ 📜login.model.ts
 ┃ ┃ ┣ 📂repositories
 ┃ ┃ ┃ ┣ 📜auth.repository.spec.ts
 ┃ ┃ ┃ ┣ 📜auth.repository.ts
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂security
 ┃ ┃ ┃ ┗ 📜security-context.ts
 ┃ ┃ ┣ 📂strategies
 ┃ ┃ ┃ ┗ 📜jwt.strategy.ts
 ┃ ┃ ┣ 📂utils
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📜auth.controller.spec.ts
 ┃ ┃ ┣ 📜auth.controller.ts
 ┃ ┃ ┗ 📜auth.module.ts
 ┃ ┣ 📂board
 ┃ ┃ ┗ 📜board.module.ts
 ┃ ┣ 📂config
 ┃ ┃ ┣ 📜prisma.ts
 ┃ ┃ ┗ 📜swagger.ts
 ┃ ┣ 📂post
 ┃ ┃ ┣ 📂commands
 ┃ ┃ ┃ ┣ 📜create-post.handler.ts
 ┃ ┃ ┃ ┣ 📜delete-post.handler.ts
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┗ 📜update-post.handler.ts
 ┃ ┃ ┣ 📂models
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┗ 📜post-api.ts
 ┃ ┃ ┣ 📂queries
 ┃ ┃ ┃ ┣ 📜get-post-by-id.handler.ts
 ┃ ┃ ┃ ┣ 📜get-posts.handler.ts
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┗ 📜post.repository.ts
 ┃ ┃ ┣ 📂resolvers
 ┃ ┃ ┃ ┣ 📜post.resolver.spec.ts
 ┃ ┃ ┃ ┗ 📜post.resolver.ts
 ┃ ┃ ┗ 📜post.module.ts
 ┃ ┣ 📂prisma
 ┃ ┃ ┣ 📜prisma.module.ts
 ┃ ┃ ┣ 📜prisma.service.spec.ts
 ┃ ┃ ┗ 📜prisma.service.ts
 ┃ ┣ 📂user
 ┃ ┃ ┣ 📂commands
 ┃ ┃ ┃ ┣ 📜create-user.handler.ts
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┗ 📜update-user.handler.ts
 ┃ ┃ ┣ 📂models
 ┃ ┃ ┃ ┗ 📜user-api.model.ts
 ┃ ┃ ┣ 📂queries
 ┃ ┃ ┃ ┣ 📜get-user-by-id.handler.ts
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┣ 📜user.repository.spec.ts
 ┃ ┃ ┃ ┗ 📜user.repository.ts
 ┃ ┃ ┣ 📂resolvers
 ┃ ┃ ┃ ┣ 📜user.resolver.spec.ts
 ┃ ┃ ┃ ┗ 📜user.resolver.ts
 ┃ ┃ ┗ 📜user.module.ts
 ┃ ┣ 📜app.controller.spec.ts
 ┃ ┣ 📜app.controller.ts
 ┃ ┣ 📜app.module.ts
 ┃ ┣ 📜app.service.ts
 ┃ ┗ 📜main.ts
 ┣ 📂test
 ┃ ┣ 📜app.e2e-spec.ts
 ┃ ┗ 📜jest-e2e.json
 ┣ 📜.dockerignore
 ┣ 📜.env.dev
 ┣ 📜.env.prod
 ┣ 📜.eslintrc.js
 ┣ 📜.gitignore
 ┣ 📜.prettierrc
 ┣ 📜Dockerfile
 ┣ 📜README.md
 ┣ 📜docker-compose.yml
 ┣ 📜nest-cli.json
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜tsconfig.build.json
 ┣ 📜tsconfig.doc.json
 ┗ 📜tsconfig.json
```

## 📦 frontend Directory 구조

```
📦src
 ┣ 📂components
 ┃ ┣ 📂List
 ┃ ┃ ┣ 📜ListFooter.tsx
 ┃ ┃ ┣ 📜ListHeader.tsx
 ┃ ┃ ┗ 📜ListTable.tsx
 ┃ ┣ 📂Modal
 ┃ ┃ ┗ 📜ConfirmModal.tsx
 ┃ ┣ 📂Sidebar
 ┃ ┃ ┗ 📜UserInfo.tsx
 ┃ ┣ 📂Update
 ┃ ┃ ┗ 📜UpdateHeader.tsx
 ┃ ┣ 📜Auth.tsx
 ┃ ┗ 📜Sidebar.tsx
 ┣ 📂config
 ┃ ┣ 📜apollo.ts
 ┃ ┣ 📜axios.ts
 ┃ ┗ 📜chakra-ui.ts
 ┣ 📂constants
 ┃ ┗ 📜error.ts
 ┣ 📂gql
 ┃ ┗ 📜index.ts
 ┣ 📂hooks
 ┃ ┣ 📜useEditor.tsx
 ┃ ┗ 📜useModal.tsx
 ┣ 📂layouts
 ┃ ┗ 📜AdminLayout.tsx
 ┣ 📂pages
 ┃ ┣ 📂Blog
 ┃ ┃ ┗ 📜PostUpdate.tsx
 ┃ ┣ 📂Notice
 ┃ ┃ ┗ 📜NoticeUpdate.tsx
 ┃ ┣ 📜Blog.tsx
 ┃ ┣ 📜Login.tsx
 ┃ ┣ 📜Main.tsx
 ┃ ┣ 📜Notice.tsx
 ┃ ┣ 📜Setting.tsx
 ┃ ┗ 📜UserManagement.tsx
 ┣ 📂recoil
 ┃ ┗ 📜index.ts
 ┣ 📂types
 ┃ ┣ 📜global.ts
 ┃ ┗ 📜server.ts
 ┣ 📂util
 ┃ ┗ 📜index.ts
 ┣ 📜App.test.tsx
 ┣ 📜App.tsx
 ┣ 📜index.tsx
 ┣ 📜logo.svg
 ┣ 📜react-app-env.d.ts
 ┣ 📜reportWebVitals.ts
 ┗ 📜setupTests.ts
```
