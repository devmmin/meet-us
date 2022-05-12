## Commit Message Rule


```
<커밋 유형>(<작업 영역>): <작업 내용 요약>
  │       │             │
  │       │             └─⫸ 현재 작업 내용 요약
  │       │
  │       └─⫸ Commit Scope: FE | BE
  │                          
  │                          
  │                          
  │                          
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```


##### Type

커밋 타입은 다음을 따른다.

* **build**: 빌드 시스템이나 외부 라이브러리 종속성 변경이나 추가 (example scopes: gulp, broccoli, npm)
* **ci**: CI 설정, 스크립트 파일의 변경(examples: CircleCi, SauceLabs)
* **docs**: 문서 변경
* **feat**: 새로운 기능
* **fix**: 버그 Fix
* **perf**: 성능 향상에 관한 작업시
* **refactor**: 버그나 기능 추가하는 것 외에 코드 수정
* **test**: 빠진 테스트 추가, 좀 더 정교한 테스트를 만드는 작업시
* **chore**: 기타 개발과는 전혀 상관없는 잡다한 수정사항들 
