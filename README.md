# Hackathon-PR-Review

## 소개

- 풀리퀘스트에 자동으로 코드리뷰를 달아주는 봇입니다. 😃
- claude sonet3.5 모델을 사용해서 코드리뷰에 특화되어있습니다.👍 

## 사용법

### Step1. github secret
> 깃허브 시크릿에 claude api key를 변수로 등록합니다.
`ANTHROPIC_API_KEY`

### Step2. github permission
> 

### Step3. github action
> 아래 스크립트를 복사해서 경로 안에 파일로 넣어주세요.
`.github/workflows/code-review.yaml`

## 
```yml
name: Pull Request Code Review

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  code-review:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "20"

      - name: Pull Request Code Review Bot
        uses: kakaotech-25/Hackathon-PR-Review@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          api-key: ${{secrets.ANTHROPIC_API_KEY}}

      - name: Post Review Results
        run: |
          echo "Code review completed!"
```

## 추가 예정
- 유저 커스텀 프롬프팅
- 라벨을 통한 리뷰 on / off 기능
- gpt api 지원
- llama3.1 8b 무료 체험 버전
